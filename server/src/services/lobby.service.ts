import { Group } from '../repositories/group.repository'
import {
    Lobby,
    LobbyRepository,
    LobbyStatus,
} from '../repositories/lobby.repository'
import crypto from 'crypto'
import { Session } from '../repositories/session.repository'
import { GroupService } from './group.service'

export type LobbyService = {
    createLobby(group: Group, owner: Session): Promise<Lobby>
    updateLobby(lobby: Lobby): Promise<boolean>
    findLobbyByGroup(group: Group): Promise<Lobby | null>
    findLobbyByGroupId(groupId: string): Promise<Lobby | null>
    findAllLobbies(): Promise<Lobby[]>
    joinLobby(groupId: string, session: Session): Promise<Lobby>
}

export const createLobbyService = (
    lobbyRepository: LobbyRepository,
    groupService: GroupService
): LobbyService => {
    const createLobby = async (group: Group, owner: Session) => {
        const lobby: Lobby = {
            _id: crypto.randomUUID(),
            group,
            owner,
            maxAllowedPlayer: 5,
            minRequiredPlayer: 3,
            mission: '',
            status: LobbyStatus.Forming,
        }
        await lobbyRepository.createLobby(lobby)
        return lobby
    }

    const updateLobby = async (lobby: Lobby) => {
        return await lobbyRepository.updateLobby(lobby)
    }

    const findLobbyByGroup = async (group: Group) => {
        return await lobbyRepository.findLobbyByGroup(group)
    }

    const findLobbyByGroupId = async (groupId: string) => {
        return await lobbyRepository.findLobbyByGroupId(groupId)
    }

    const findAllLobbies = async () => {
        return await lobbyRepository.findAllLobbies()
    }

    const joinLobby = async (groupId: string, session: Session) => {
        const group = await groupService.findGroupById(groupId)
        if (group) {
            const lobby = await findLobbyByGroup(group)
            if (lobby) {
                if (groupService.isSessionInGroup(group, session)) {
                    return lobby
                }
                if (lobby.maxAllowedPlayer > lobby.group.groupMembers.length) {
                    lobby.group = await groupService.joinGroup(groupId, session)
                    await updateLobby(lobby)
                    return lobby
                }
                throw new Error('lobby is full')
            }
            throw new Error('lobby not found')
        }
        throw new Error('group not found')
    }

    return {
        createLobby,
        updateLobby,
        findLobbyByGroup,
        findLobbyByGroupId,
        findAllLobbies,
        joinLobby,
    }
}
