import { Game, GameRepository } from '../src/repositories/game.repository'
import { LobbyService } from '../src/services/lobby.service'
import { Lobby, LobbyRepository } from '../src/repositories/lobby.repository'
import { Group } from '../src/repositories/group.repository'
import { GroupService } from '../src/services/group.service'

export const mockData = {
    game: {
        _id: '1',
    },
    lobby: {
        _id: '1',
    },
    group: {
        _id: '1',
    },
}

export const createMocks = (mockData: any) => {
    const gameRepoMock: GameRepository = {
        findGame: jest.fn(() => {
            return Promise.resolve(mockData.game as Game)
        }),
        findGameByGroupId: jest.fn(() => {
            return Promise.resolve(mockData.game as Game)
        }),
        createGame: jest.fn(() => {
            return Promise.resolve(true)
        }),
        updateGame: jest.fn(() => {
            return Promise.resolve(true)
        }),
    }
    const lobbyServiceMock: LobbyService = {
        createLobby: jest.fn(() => {
            return Promise.resolve(mockData.lobby as Lobby)
        }),
        updateLobby: jest.fn(() => {
            return Promise.resolve(true)
        }),
        findAllLobbies: jest.fn(() => {
            return Promise.resolve([mockData.lobby as Lobby])
        }),
        findLobbyByGroupId: jest.fn(() => {
            return Promise.resolve(mockData.lobby as Lobby)
        }),
        setMission: jest.fn(() => {
            return Promise.resolve(mockData.lobby as Lobby)
        }),
        findLobbyByGroup: jest.fn(() => {
            return Promise.resolve(mockData.lobby as Lobby)
        }),
        joinLobby: jest.fn(() => {
            return Promise.resolve(mockData.lobby as Lobby)
        }),
    }
    const groupServiceMock: GroupService = {
        createGroup: jest.fn(() => {
            return Promise.resolve(mockData.group as Group)
        }),
        joinGroup: jest.fn(() => {
            return Promise.resolve(mockData.group as Group)
        }),
        findGroupById: jest.fn(() => {
            return Promise.resolve(mockData.group as Group)
        }),
        leaveGroup: jest.fn(() => {
            return Promise.resolve()
        }),
        findGroupBySession: jest.fn(() => {
            return Promise.resolve(mockData.group as Group)
        }),
        isSessionInGroup: jest.fn(() => {
            return true
        }),
    }

    const lobbyRepoMock: LobbyRepository = {
        findLobby: jest.fn(() => {
            return Promise.resolve(mockData.lobby as Lobby)
        }),
        findLobbyByGroup: jest.fn(() => {
            return Promise.resolve(mockData.lobby as Lobby)
        }),
        findLobbyByGroupId: jest.fn(() => {
            return Promise.resolve(mockData.lobby as Lobby)
        }),
        findAllLobbies: jest.fn(() => {
            return Promise.resolve([mockData.lobby as Lobby])
        }),
        createLobby: jest.fn(() => {
            return Promise.resolve(true)
        }),
        updateLobby: jest.fn(() => {
            return Promise.resolve(true)
        }),
    }
    return { gameRepoMock, lobbyRepoMock, lobbyServiceMock, groupServiceMock }
}
