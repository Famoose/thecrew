import { Group } from '../repositories/group.repository'
import {
    Lobby,
    LobbyRepository,
    LobbyStatus,
} from '../repositories/lobby.repository'
import crypto from 'crypto'
import { Session } from '../repositories/session.repository'
import { GroupService } from './group.service'
import { Mission, missions } from '../data/missions'

export type LobbyService = {
    createLobby(group: Group, owner: Session): Promise<Lobby>
    updateLobby(lobby: Lobby): Promise<boolean>
    findLobbyByGroup(group: Group): Promise<Lobby | null>
    findLobbyByGroupId(groupId: string): Promise<Lobby | null>
    findAllLobbies(): Promise<Lobby[]>
    joinLobby(groupId: string, session: Session): Promise<Lobby>
    setMission(
        groupId: string,
        mission: Mission,
        session: Session
    ): Promise<Lobby>
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
        const lobby = await findLobbyByGroupId(groupId)
        if (lobby) {
            if (groupService.isSessionInGroup(lobby.group, session)) {
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

    const setMission = async (
        groupId: string,
        mission: Mission,
        session: Session
    ) => {
        const lobby = await findLobbyByGroupId(groupId)
        if (lobby) {
            if (lobby.owner._id === session._id) {
                const foundMission = missions.find((m) => m._id === mission._id)
                if (foundMission) {
                    lobby.mission = foundMission
                    await updateLobby(lobby)
                    return lobby
                }
                throw new Error('Mission not found')
            }
            throw new Error('Session is not the lobby owner')
        }
        throw new Error('Lobby not found')
    }

    return {
        createLobby,
        updateLobby,
        findLobbyByGroup,
        findLobbyByGroupId,
        findAllLobbies,
        joinLobby,
        setMission,
    }
}
