import { Db } from 'mongodb'
import { Lobby } from './lobby.repository'

export type GameRepository = {
    findGame(id: string): Promise<Game | null>
    createGame(game: Game): Promise<boolean>
    updateGame(game: Game): Promise<boolean>
    findGameByGroupId(groupId: string): Promise<Game | null>
}

//Todo erweiter mit auftragskarten - session id, stich history und activer spieler
export type Game = {
    _id: string
    lobby: Lobby
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
