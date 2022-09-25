import {Group} from '../repositories/group.repository'
import {Lobby, LobbyRepository} from "../repositories/lobby.repository";
import crypto from 'crypto'

export type LobbyService = {
    createLobby(group: Group): Promise<Lobby>
    updateLobby(lobby: Lobby): Promise<boolean>
    findLobbyByGroup(group: Group): Promise<Lobby | null>
    findAllLobbies(): Promise<Lobby[]>
}

export const createLobbyService = (
    lobbyRepository: LobbyRepository
): LobbyService => {
    const createLobby = async (group: Group) => {
        const lobby: Lobby = {
            _id: crypto.randomUUID(),
            group,
            maxAllowedPlayer: 7,
            minRequiredPlayer: 3,
            mission: ''
        }
        await lobbyRepository.createLobby(lobby)
        return lobby
    }
    const updateLobby = async (lobby: Lobby) => {
        return await lobbyRepository.updateLobby(lobby)
    }

    const findLobbyByGroup = async (group: Group) => {
        return await lobbyRepository.findLobbyByGroup(group);
    }

    const findAllLobbies = async () => {
        return await lobbyRepository.findAllLobbies();
    }

    return {createLobby, updateLobby, findLobbyByGroup, findAllLobbies}
}
