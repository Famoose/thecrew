import { createGameService, GameService } from '../../src/services/game.service'
import { LobbyStatus } from '../../src/types'
import { missions } from '../../src/data/missions'
import { cards, CardType, Color } from '../../src/data/cards'
import { quests } from '../../src/data/quests'
import { createMockData, createMocks } from '../mocks'
import { GameRepository } from '../../src/repositories/game.repository'
import { LobbyService } from '../../src/services/lobby.service'
import { GroupService } from '../../src/services/group.service'

describe('game service tests', () => {
    let gameService: GameService
    let deps: {
        gameRepoMock: GameRepository
        lobbyServiceMock: LobbyService
        groupServiceMock: GroupService
    }

    const mockData = createMockData()

    beforeEach(() => {
        deps = createMocks(mockData)
        gameService = createGameService(
            deps.gameRepoMock,
            deps.lobbyServiceMock,
            deps.groupServiceMock
        )
    })

    describe('getGame', () => {
        const session = { _id: '1', userID: '1' }
        mockData.game = <any>{
            _id: '1',
            lobby: {
                _id: '1',
                group: {
                    groupMembers: [session],
                },
            },
        }
        it('getGame success', async () => {
            expect(await gameService.getGame('1', session)).toBe(mockData.game)
        })
        it('getGame player is not in game group', async () => {
            deps.groupServiceMock.isSessionInGroup = jest.fn(() => false)
            await expect(gameService.getGame('1', session)).rejects.toThrow(
                'player is not in game group'
            )
        })
        it('getGame game not found', async () => {
            deps.gameRepoMock.findGame = jest.fn(() => Promise.resolve(null))
            await expect(gameService.getGame('1', session)).rejects.toThrow(
                'game not found'
            )
        })
    })

    describe('startGame', () => {
        const session = { _id: '1', userID: '1' }
        const groupMembers = [session]
        const lobby = <any>{
            _id: '1',
            group: {
                groupMembers,
            },
            minRequiredPlayer: 3,
            maxAllowedPlayer: 5,
            mission: missions[0],
            owner: session,
            status: LobbyStatus.Forming,
        }
        mockData.lobby = lobby
        mockData.game = <any>{
            _id: '1',
            lobby,
        }

        it('lobby should have enough players', async () => {
            await expect(gameService.startGame('1', session)).rejects.toThrow(
                'lobby not in right condition to start a game'
            )
        })

        it('game should start', async () => {
            groupMembers.push(session, session)
            const game = await gameService.startGame('1', session)

            expect(deps.lobbyServiceMock.updateLobby).toHaveBeenCalled()
            expect(deps.gameRepoMock.createGame).toHaveBeenCalledWith(game)
            expect(game.lobby.status).toBe(LobbyStatus.InGame)

            expect(game.rounds).toHaveLength(1)
            expect(
                game.rounds[0]?.cardsPlayers.flatMap((cp) => cp.cards)
            ).toHaveLength(cards.length)
            expect(game.rounds[0]?.nextPlayer).toBe(session)
            expect(game.rounds[0]?.cardsPlayers).toHaveLength(
                groupMembers.length
            )
            expect(game.questPlayers).toHaveLength(lobby.mission.quests.length)
        })
    })

    describe('updateGame', () => {
        it('should update game', () => {
            gameService.updateGame(<any>mockData.game)
            expect(deps.gameRepoMock.updateGame).toHaveBeenCalledWith(
                mockData.game
            )
        })
    })

    describe('getCurrentRound', () => {
        const session = { _id: '1', userID: '1' }
        const round = {
            cardsPlayers: [],
            nextPlayers: session,
            moves: [],
        }
        const game = <any>{
            _id: '1',
            rounds: [round],
        }
        it('should getCurrentRound', () => {
            const currentRound = gameService.getCurrentRound(game)
            expect(currentRound).toBe(round)
        })
    })

    describe('checkIfPlayerIsAllowedToPlayCard', () => {
        const session = { _id: '1', userID: '1' }
        const card = cards[0]
        const round = {
            cardsPlayers: [
                {
                    player: session,
                    cards: [card, cards[12]],
                },
            ],
            nextPlayer: session,
            moves: [],
            winner: undefined,
        }
        it('player should be able to play if he has the card and is the next player', () => {
            expect(
                gameService.checkIfPlayerIsAllowedToPlayCard(
                    <any>round,
                    <any>card,
                    session
                )
            ).toBe(true)
        })
        it('player should only play same color', () => {
            round.moves = <any>[
                {
                    player: { _id: '2', userID: '2' },
                    card: {
                        value: 5,
                        color: Color.BLUE,
                        type: CardType.NORMAL,
                    },
                },
            ]
            expect(
                gameService.checkIfPlayerIsAllowedToPlayCard(
                    <any>round,
                    <any>card,
                    session
                )
            ).toBe(false)
        })
    })

    describe('findWinner', () => {
        const session = { _id: '1', userID: '1' }
        const round = {
            cardsPlayers: [
                {
                    player: session,
                    cards: [cards[12]],
                },
            ],
            nextPlayer: session,
            moves: [
                {
                    player: session,
                    card: cards[12],
                },
            ],
            winner: undefined,
        }
        it('should find winner', () => {
            expect(gameService.findWinner(<any>round)).toBe(session)
        })
    })

    describe('createRound', () => {
        const session = { _id: '1', userID: '1' }
        const round = {
            cardsPlayers: [
                {
                    player: session,
                    cards: [cards[12], cards[13]],
                },
            ],
            nextPlayer: session,
            moves: [
                {
                    player: session,
                    card: cards[12],
                },
            ],
            winner: session,
        }
        const game = {
            _id: '1',
            rounds: [round],
        }
        it('should create round', () => {
            const newRound = gameService.createRound(<any>game)
            expect(newRound).toEqual({
                cardsPlayers: [
                    {
                        cards: [cards[13]],
                        player: session,
                    },
                ],
                moves: [],
                nextPlayer: session,
            })
        })
    })

    describe('getNextPlayer', () => {
        const session1 = { _id: '1', userID: '1' }
        const session2 = { _id: '2', userID: '2' }
        const group = {
            groupMembers: [session1, session2],
        }
        const round = {
            cardsPlayers: [
                {
                    player: session1,
                    cards: [cards[12], cards[13]],
                },
                {
                    player: session2,
                    cards: [cards[12], cards[13]],
                },
            ],
            nextPlayer: session1,
            moves: [
                {
                    player: session1,
                    card: cards[12],
                },
            ],
        }
        it('should getNextPlayer', () => {
            expect(gameService.getNextPlayer(<any>round, <any>group)).toBe(
                session2
            )
        })
    })

    describe('endGame', () => {
        const session1 = { _id: '1', userID: '1' }
        const session2 = { _id: '2', userID: '2' }

        const round = {
            cardsPlayers: [
                {
                    player: session1,
                    cards: [cards[12], cards[13]],
                },
                {
                    player: session2,
                    cards: [cards[12], cards[13]],
                },
            ],
            nextPlayer: session1,
            moves: [
                {
                    player: session1,
                    card: cards[12],
                },
            ],
        }
        const game = {
            _id: '1',
            questPlayers: [
                {
                    player: session1,
                    quest: quests[0],
                },
                {
                    player: session2,
                    quest: quests[1],
                },
            ],
            rounds: [round],
            lobby: {
                status: LobbyStatus.InGame,
            },
        }
        it('should endGame', async () => {
            const endGame = await gameService.endGame(<any>game)
            expect(endGame.result?.won).toBe(false)
            expect(endGame.result?.questResults).toHaveLength(2)
            expect(endGame.lobby.status).toBe(LobbyStatus.Forming)
        })
    })
})
