import { createMockData, createMocks } from '../mocks'
import { SessionService } from '../../src/services/session.service'
import { Namespace } from 'socket.io'
import { createLobbyController } from '../../src/module/lobby/lobby.controller'
import { LobbyService } from '../../src/services/lobby.service'
import { GameService } from '../../src/services/game.service'
import { GroupService } from '../../src/services/group.service'

describe('chat service tests', () => {
    let lobbyController: any
    let deps: {
        namespaceMock: Namespace
        groupServiceMock: GroupService
        sessionServiceMock: SessionService
        gameServiceMock: GameService
        lobbyServiceMock: LobbyService
    }

    const mockData = createMockData()

    beforeEach(() => {
        deps = createMocks(mockData)
        lobbyController = createLobbyController(
            deps.namespaceMock,
            deps.sessionServiceMock,
            deps.groupServiceMock,
            deps.lobbyServiceMock,
            deps.gameServiceMock
        )
        lobbyController.handshake = { auth: { token: '1' } }
        lobbyController.join = jest.fn()
    })

    describe('createLobby', () => {
        it('should create lobby', async () => {
            const callback = jest.fn()
            await lobbyController.createLobby(callback)

            expect(deps.groupServiceMock.createGroup).toHaveBeenCalled()
            expect(deps.groupServiceMock.joinGroup).toHaveBeenCalled()
            expect(deps.lobbyServiceMock.createLobby).toHaveBeenCalled()
            expect(lobbyController.join).toHaveBeenCalledWith(
                mockData.group._id
            )
            expect(deps.namespaceMock.emit).toHaveBeenCalledWith(
                'lobby:list:changed'
            )
            expect(callback).toHaveBeenCalledWith(mockData.group._id)
        })
    })

    describe('createLobby', () => {
        const group = {
            _id: '1',
        }
        mockData.lobby = <any>{
            _id: '1',
            group,
        }
        it('should join lobby', async () => {
            const callback = jest.fn()
            const groupId = '1'
            await lobbyController.joinLobby(groupId, callback)

            expect(deps.lobbyServiceMock.joinLobby).toHaveBeenCalled()
            expect(lobbyController.join).toHaveBeenCalledWith(group._id)
            expect(deps.namespaceMock.emit).toHaveBeenCalledWith(
                'lobby:list:changed'
            )
            expect(callback).toHaveBeenCalledWith(mockData.lobby)
        })
    })

    describe('listLobbies', () => {
        it('should list all Lobbies', async () => {
            const callback = jest.fn()
            await lobbyController.listLobbies(callback)

            expect(deps.lobbyServiceMock.findAllLobbies).toHaveBeenCalled()
            expect(callback).toHaveBeenCalledWith([mockData.lobby])
        })
    })

    describe('setMission', () => {
        it('should set mission', async () => {
            const groupId = '1'
            const mission = <any>{ _id: '1' }
            await lobbyController.setMission(groupId, mission)

            expect(deps.lobbyServiceMock.setMission).toHaveBeenCalledWith(
                groupId,
                mission,
                mockData.session
            )
            expect(deps.namespaceMock.emit).toHaveBeenCalledWith(
                'lobby:changed',
                mockData.lobby
            )
            expect(deps.namespaceMock.emit).toHaveBeenCalledWith(
                'lobby:list:changed'
            )
        })
    })
})
