import { Db } from 'mongodb'
import { Lobby } from './lobby.repository'
import { Session } from './session.repository'
import { Quest } from '../data/quests'
import { Card } from '../data/cards'

export type GameRepository = {
    findGame(id: string): Promise<Game | null>
    createGame(game: Game): Promise<boolean>
    updateGame(game: Game): Promise<boolean>
    findGameByGroupId(groupId: string): Promise<Game | null>
}
export type QuestPlayer = {
    player: Session
    quest: Quest
}

export type CardsPlayer = {
    player: Session
    cards: Card[]
}

export type Move = {
    player: Session
    card: Card
}

export type Round = {
    nextPlayer: Session
    cardsPlayers: CardsPlayer[]
    moves: Move[]
    winner: Session | undefined
}

export type Game = {
    _id: string
    lobby: Lobby
    questPlayers: QuestPlayer[]
    rounds: Round[]
}

export const createGameRepository = (database: Db): GameRepository => {
    const collection = database.collection<Game>('game')

    const findGame = async (id: string) => {
        const query = { _id: id }
        return await collection.findOne(query)
    }
    const createGame = async (game: Game) => {
        const sessionInsertOneResult = await collection.insertOne(game)
        return sessionInsertOneResult.acknowledged
    }
    const updateGame = async (game: Game) => {
        const query = { _id: game._id }
        const update = {
            $set: {
                lobby: game.lobby,
                questPlayers: game.questPlayers,
                rounds: game.rounds,
            },
        }
        const updateResult = await collection.updateOne(query, update)
        return updateResult.acknowledged
    }

    const findGameByGroupId = async (groupId: string) => {
        const query = {
            'lobby.group._id': { $eq: groupId },
        }

        return await collection.findOne(query)
    }

    return {
        findGame,
        createGame,
        updateGame,
        findGameByGroupId,
    }
}
