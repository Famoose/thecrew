import { Db } from 'mongodb'
import { Group } from './group.repository'
import { Session } from './session.repository'
import { Mission } from '../data/missions'

export type LobbyRepository = {
    findLobby(id: string): Promise<Lobby | null>
    createLobby(lobby: Lobby): Promise<boolean>
    updateLobby(lobby: Lobby): Promise<boolean>
    findAllLobbies(): Promise<Lobby[]>
    findLobbyByGroup(group: Group): Promise<Lobby | null>
    findLobbyByGroupId(groupId: string): Promise<Lobby | null>
}

export enum LobbyStatus {
    InGame = 'IN_GAME',
    Forming = 'FORMING',
}

export type Lobby = {
    _id: string
    owner: Session
    mission?: Mission
    maxAllowedPlayer: number
    minRequiredPlayer: number
    group: Group
    status: LobbyStatus
    activeGame?: string
}

export const createLobbyRepository = (database: Db): LobbyRepository => {
    const collection = database.collection<Lobby>('lobby')

    const findLobby = async (id: string) => {
        const query = { _id: id }
        return await collection.findOne(query)
    }
    const createLobby = async (lobby: Lobby) => {
        const sessionInsertOneResult = await collection.insertOne(lobby)
        return sessionInsertOneResult.acknowledged
    }
    const updateLobby = async (lobby: Lobby) => {
        const query = { _id: lobby._id }
        const update = {
            $set: {
                mission: lobby.mission,
                group: lobby.group,
                status: lobby.status,
                owner: lobby.owner,
                activeGame: lobby.activeGame,
            },
        }
        const updateResult = await collection.updateOne(query, update)
        return updateResult.acknowledged
    }
    const findAllLobbies = async () => {
        return await collection.find().toArray()
    }
    const findLobbyByGroup = async (group: Group) => {
        const query = { group }

        return await collection.findOne(query)
    }
    const findLobbyByGroupId = async (groupId: string) => {
        const query = {
            'group._id': { $eq: groupId },
        }
        return await collection.findOne(query)
    }

    return {
        findLobby,
        createLobby,
        updateLobby,
        findAllLobbies,
        findLobbyByGroup,
        findLobbyByGroupId,
    }
}
