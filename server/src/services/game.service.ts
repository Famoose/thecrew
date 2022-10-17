import {
    CardsPlayer,
    Game,
    GameRepository,
    Move,
    QuestPlayer,
    Round,
} from '../repositories/game.repository'
import { LobbyService } from './lobby.service'
import { Lobby, LobbyStatus } from '../repositories/lobby.repository'
import { Session } from '../repositories/session.repository'
import { GroupService } from './group.service'
import crypto from 'crypto'
import { Quest } from '../data/quests'
import { Card, cards, CardType } from '../data/cards'
import { Group } from '../repositories/group.repository'

export type GameService = {
    startGame(groupId: string, session: Session): Promise<Game>
    getGame(groupId: string, session: Session): Promise<Game>
    getCurrentRound(game: Game): Round
    checkIfPlayerIsAllowedToPlayCard(
        currentRound: Round,
        card: Card,
        session: Session
    ): boolean
    findWinner(currentRound: Round): Session
    createRound(game: Game): Round
    getNextPlayer(currentRound: Round, group: Group): Session
    updateGame(game: Game): Promise<boolean>
}

export const createGameService = (
    gameRepository: GameRepository,
    lobbyService: LobbyService,
    groupService: GroupService
): GameService => {
    const distributeQuestToPlayers = (lobby: Lobby) => {
        if (lobby.mission) {
            const questPlayers: QuestPlayer[] = []
            const playerCount = lobby.group.groupMembers.length
            lobby.mission.quests.forEach((quest: Quest, index) => {
                const player = lobby.group.groupMembers[index % playerCount]
                if (player) {
                    questPlayers.push({
                        player,
                        quest,
                    })
                } else {
                    throw new Error('player not found')
                }
            })
            return questPlayers
        }
        throw new Error('mission was null')
    }

    const distributeCardsToPlayers = (game: Game): CardsPlayer[] => {
        const cardCopy = [...cards]
        const shuffledCards = cardCopy.sort(() => Math.random() - 0.5)

        const playerCount = game.lobby.group.groupMembers.length
        const cardsPlayers: CardsPlayer[] = game.lobby.group.groupMembers.map(
            (m) => ({ player: m, cards: [] })
        )
        shuffledCards.forEach((card, index) => {
            const player = cardsPlayers[index % playerCount]
            if (player) {
                player.cards.push(card)
            } else {
                throw new Error('player not found')
            }
        })
        return cardsPlayers
    }

    const startGame = async (groupId: string, session: Session) => {
        const lobby = await lobbyService.findLobbyByGroupId(groupId)
        if (lobby) {
            if (
                groupService.isSessionInGroup(lobby.group, session) &&
                lobby.owner._id === session._id
            ) {
                if (
                    lobby.group.groupMembers.length >=
                        lobby.minRequiredPlayer &&
                    lobby.group.groupMembers.length <= lobby.maxAllowedPlayer &&
                    lobby.status === LobbyStatus.Forming
                ) {
                    if (lobby.mission) {
                        lobby.status = LobbyStatus.InGame

                        const newGame: Game = {
                            _id: crypto.randomUUID(),
                            lobby,
                            questPlayers: distributeQuestToPlayers(lobby),
                            rounds: [],
                        }
                        newGame.rounds.push(createRound(newGame))

                        const scc = await gameRepository.createGame(newGame)
                        if (scc) {
                            await lobbyService.updateLobby(lobby)
                            return newGame
                        }
                        throw new Error('could not save new game to database')
                    }
                    throw new Error('mission was not found')
                }
                throw new Error('lobby not in right condition to start a game')
            }
            throw new Error('player who started is not in the lobby')
        }
        throw new Error('lobby not found')
    }

    const getGame = async (gameId: string, session: Session) => {
        const game = await gameRepository.findGame(gameId)
        if (game) {
            if (groupService.isSessionInGroup(game.lobby.group, session)) {
                return game
            }
            throw new Error('player is not in game group')
        }
        throw new Error('game not found')
    }

    const findWinner = (set: Round): Session => {
        const firstCard = set.moves[0]
        const trumps = set.moves.filter((m) => m.card.type === CardType.TRUMP)
        if (trumps && trumps.length > 0) {
            trumps.sort(sortCardsByValue)
            const player = trumps[trumps.length - 1]?.player
            if (player) {
                return player
            }
        }
        //if no trump cards
        if (firstCard) {
            const validCards = set.moves.filter(
                (m) => m.card.color === firstCard.card.color
            )
            validCards.sort(sortCardsByValue)
            const player = validCards[validCards.length - 1]?.player
            if (player) {
                return player
            }
        }
        throw new Error('could not evaluate winning player')
    }

    const sortCardsByValue = (a: Move, b: Move): number => {
        if (a.card.value < b.card.value) {
            return -1
        }
        if (a.card.value > b.card.value) {
            return 1
        }
        return 0
    }

    const getNextPlayer = (set: Round, group: Group): Session => {
        //get current player index
        const currentPlayerIndex = group.groupMembers.findIndex(
            (member) => set.nextPlayer._id === member._id
        )
        const nextPlayer =
            group.groupMembers[
                (currentPlayerIndex + 1) % group.groupMembers.length
            ]
        if (nextPlayer) {
            return nextPlayer
        } else {
            throw new Error('next player not found')
        }
    }

    const checkIfPlayerIsAllowedToPlayCard = (
        set: Round,
        card: Card,
        session: Session
    ): boolean => {
        //check if next player
        if (set.nextPlayer._id !== session._id) {
            return false
        }
        //check if already played
        if (set.moves.find((move) => move.player._id === session._id)) {
            return false
        }
        //check if player has card
        if (
            set.cardsPlayers
                .find((cp) => cp.player._id === session._id)
                ?.cards.find((c) => isCardEqual(c, card))
        ) {
            return checkIfCardIsAllowedToPlay(set, card, session)
        }
        return false
    }

    const checkIfCardIsAllowedToPlay = (
        set: Round,
        card: Card,
        session: Session
    ): boolean => {
        //check if player is first
        if (set.moves.length === 0) {
            return true
        }
        const firstCard = set.moves[0]
        if (firstCard) {
            const playerHasSameColor = set.cardsPlayers
                .find((cp) => cp.player._id === session._id)
                ?.cards.filter((c) => c.color === firstCard.card.color)
            //if player has same color
            if (playerHasSameColor && playerHasSameColor.length > 0) {
                if (playerHasSameColor.find((c) => isCardEqual(c, card))) {
                    return true
                } else {
                    return false
                }
            }
            //player don't have same color
            return true
        }
        return false
    }

    const isCardEqual = (card1: Card, card2: Card): boolean => {
        return (
            card1.value === card2.value &&
            card1.color === card2.color &&
            card1.type === card2.type
        )
    }

    const getCurrentRound = (game: Game): Round => {
        const round = game.rounds[game.rounds.length - 1]
        if (round) {
            return round
        } else {
            throw new Error('no round found')
        }
    }

    const updateGame = async (game: Game) => {
        return gameRepository.updateGame(game)
    }

    const createRound = (game: Game): Round => {
        if (game.rounds && game.rounds.length > 0) {
            const currentRound = getCurrentRound(game)
            const cardsPlayers = currentRound.cardsPlayers.map((cp) => {
                const playedCard = currentRound.moves.find(
                    (m) => m.player._id === cp.player._id
                )?.card
                if (playedCard) {
                    return {
                        player: cp.player,
                        cards: cp.cards.filter(
                            (c) => !isCardEqual(c, playedCard)
                        ),
                    }
                }
                throw new Error(
                    'invalid round state, could not create new round based on last'
                )
            })
            if (currentRound.winner) {
                return {
                    nextPlayer: currentRound.winner,
                    cardsPlayers,
                    winner: undefined,
                    moves: [],
                }
            }
            throw new Error('last round had no winner')
        }
        const cardsPlayers = distributeCardsToPlayers(game)
        const firstPlayer = cardsPlayers[0]?.player
        if (firstPlayer) {
            return {
                nextPlayer: firstPlayer,
                cardsPlayers,
                winner: undefined,
                moves: [],
            }
        }
        throw new Error('cards players had no player')
    }

    return {
        startGame,
        getGame,
        findWinner,
        createRound,
        updateGame,
        getCurrentRound,
        checkIfPlayerIsAllowedToPlayCard,
        getNextPlayer,
    }
}
