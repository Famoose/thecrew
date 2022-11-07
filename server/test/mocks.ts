import {
    Game,
    GameRepository,
    Round,
} from '../src/repositories/game.repository'
import { LobbyService } from '../src/services/lobby.service'
import { Lobby, LobbyRepository } from '../src/repositories/lobby.repository'
import { Group, GroupRepository } from '../src/repositories/group.repository'
import { GroupService } from '../src/services/group.service'
import { Namespace } from 'socket.io'
import { ChatService } from '../src/services/chat.service'
import { SessionService } from '../src/services/session.service'
import { Session } from '../src/repositories/session.repository'
import { GameService } from '../src/services/game.service'

export const createMockData = () => {
    const mockData = {
        game: {
            _id: '1',
        },
        lobby: {
            _id: '1',
        },
        group: {
            _id: '1',
        },
        session: {
            _id: '1',
            userID: '1',
        },
        round: {
            cardsPlayers: [],
            nextPlayer: {
                _id: '1',
                userID: '1',
            },
            moves: [],
            winner: undefined,
        },
    }

    return { ...mockData }
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

    const gameServiceMock: GameService = {
        startGame: jest.fn(() => {
            return Promise.resolve(mockData.game as Game)
        }),
        getGame: jest.fn(() => {
            return Promise.resolve(mockData.game as Game)
        }),
        getCurrentRound: jest.fn(() => {
            return mockData.round as Round
        }),
        checkIfPlayerIsAllowedToPlayCard: jest.fn(() => {
            return true
        }),
        findWinner: jest.fn(() => {
            return mockData.session
        }),
        createRound: jest.fn(() => {
            return mockData.round as Round
        }),
        getNextPlayer: jest.fn(() => {
            return mockData.session
        }),
        updateGame: jest.fn(() => {
            return Promise.resolve(true)
        }),
        endGame: jest.fn(() => {
            return Promise.resolve(mockData.game as Game)
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
            return Promise.resolve(mockData.group as Group)
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

    const groupRepoMock: GroupRepository = {
        findGroup: jest.fn(() => {
            return Promise.resolve(mockData.group as Group)
        }),
        createGroup: jest.fn(() => {
            return Promise.resolve(true)
        }),
        updateGroup: jest.fn(() => {
            return Promise.resolve(true)
        }),
        findAllGroups: jest.fn(() => {
            return Promise.resolve([mockData.group as Group])
        }),
        findGroupBySession: jest.fn(() => {
            return Promise.resolve(mockData.group as Group)
        }),
    }

    const chatServiceMock: ChatService = {
        isSessionInChatGroup: jest.fn(() => {
            return Promise.resolve(mockData.group as Group)
        }),
    }

    const sessionServiceMock: SessionService = {
        findSession: jest.fn(() => {
            return Promise.resolve(mockData.session as Session)
        }),
        createSession: jest.fn(() => {
            return Promise.resolve(true)
        }),
        findAllSessions: jest.fn(() => {
            return Promise.resolve([mockData.session as Session])
        }),
        checkValidSession: jest.fn(() => {
            return Promise.resolve(mockData.session as Session)
        }),
        anonymizeSession: jest.fn(() => {
            return { userID: mockData.session.userID }
        }),
    }

    const emitMock = {
        emit: jest.fn(),
    }

    const namespaceMock: Namespace = {
        to: jest.fn(() => emitMock),
        ...emitMock,
    } as unknown as Namespace

    return {
        gameRepoMock,
        gameServiceMock,
        lobbyRepoMock,
        lobbyServiceMock,
        groupServiceMock,
        groupRepoMock,
        chatServiceMock,
        namespaceMock,
        sessionServiceMock,
        mockData,
    }
}
