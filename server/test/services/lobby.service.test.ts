import {
    createLobbyService,
    LobbyService,
} from '../../src/services/lobby.service'
import { GroupService } from '../../src/services/group.service'
import { createMockData, createMocks } from '../mocks'
import {
    Lobby,
    LobbyRepository,
    LobbyStatus,
} from '../../src/repositories/lobby.repository'
import { Group } from '../../src/repositories/group.repository'
import { Mission, missions } from '../../src/data/missions'

describe('lobby service tests', () => {
    let lobbyService: LobbyService
    let deps: {
        lobbyRepoMock: LobbyRepository
        groupServiceMock: GroupService
    }

    const mockData = createMockData()

    beforeEach(() => {
        deps = createMocks(mockData)
        lobbyService = createLobbyService(
            deps.lobbyRepoMock,
            deps.groupServiceMock
        )
    })

    describe('createLobby', () => {
        const session = { _id: '1', userID: '1' }
        const group = { _id: '1', groupMembers: [session] } as Group
        it('should create lobby', async () => {
            const lobby = await lobbyService.createLobby(group, session)
            expect(lobby._id).toBeDefined()
            expect(lobby.group).toBe(group)
            expect(lobby.status).toBe(LobbyStatus.Forming)
            expect(deps.lobbyRepoMock.createLobby).toHaveBeenCalledTimes(1)
        })
    })

    describe('udpateLobby', () => {
        const lobby = { _id: '1' } as Lobby
        it('should update lobby', async () => {
            expect(await lobbyService.updateLobby(lobby)).toBe(true)
            expect(deps.lobbyRepoMock.updateLobby).toHaveBeenCalledTimes(1)
        })
    })

    describe('findLobby', () => {
        const session = { _id: '1', userID: '1' }
        const group = { _id: '1', groupMembers: [session] } as Group
        it('should find lobby by group', async () => {
            expect(await lobbyService.findLobbyByGroup(group)).toBe(
                mockData.lobby
            )
            expect(deps.lobbyRepoMock.findLobbyByGroup).toHaveBeenCalledTimes(1)
        })

        it('should find lobby by group id', async () => {
            expect(await lobbyService.findLobbyByGroupId('1')).toBe(
                mockData.lobby
            )
            expect(deps.lobbyRepoMock.findLobbyByGroupId).toHaveBeenCalledTimes(
                1
            )
        })

        it('should find all lobby', async () => {
            expect(await lobbyService.findAllLobbies()).toEqual([
                mockData.lobby,
            ])
            expect(deps.lobbyRepoMock.findAllLobbies).toHaveBeenCalledTimes(1)
        })
    })

    describe('joinLobby', () => {
        const session = { _id: '1', userID: '1' }
        it('should already be in lobby', async () => {
            const lobby = await lobbyService.joinLobby('1', session)
            expect(lobby).toBe(mockData.lobby)

            expect(deps.lobbyRepoMock.findLobbyByGroupId).toHaveBeenCalledTimes(
                1
            )
            expect(deps.groupServiceMock.joinGroup).toHaveBeenCalledTimes(0)
        })

        it('should join lobby', async () => {
            mockData.lobby = <any>{
                _id: '',
                group: {
                    groupMembers: [{}],
                },
                maxAllowedPlayer: 5,
            }
            deps.groupServiceMock.isSessionInGroup = jest.fn(() => false)

            const lobby = await lobbyService.joinLobby('1', session)
            expect(lobby).toBe(mockData.lobby)

            expect(deps.lobbyRepoMock.findLobbyByGroupId).toHaveBeenCalledTimes(
                1
            )
            expect(deps.groupServiceMock.joinGroup).toHaveBeenCalledTimes(1)
        })

        it('should not find lobby', async () => {
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            mockData.lobby = null
            await expect(lobbyService.joinLobby('1', session)).rejects.toThrow(
                'lobby not found'
            )
            expect(deps.lobbyRepoMock.findLobbyByGroupId).toHaveBeenCalledTimes(
                1
            )
        })

        it('should be full lobby', async () => {
            mockData.lobby = <any>{
                _id: '',
                group: {
                    groupMembers: [{}, {}, {}, {}, {}],
                },
                maxAllowedPlayer: 5,
            }
            deps.groupServiceMock.isSessionInGroup = jest.fn(() => false)
            await expect(lobbyService.joinLobby('1', session)).rejects.toThrow(
                'lobby is full'
            )
            expect(deps.lobbyRepoMock.findLobbyByGroupId).toHaveBeenCalledTimes(
                1
            )
        })
    })

    describe('setMission', () => {
        const session = { _id: '1', userID: '1' }
        beforeEach(() => {
            mockData.lobby = <any>{
                _id: '',
                owner: session,
                group: {
                    groupMembers: [{}, {}, {}, {}, {}],
                },
                maxAllowedPlayer: 5,
            }
        })

        it('should set mission', async () => {
            await lobbyService.setMission('1', missions[0] as Mission, session)
            expect(deps.lobbyRepoMock.findLobbyByGroupId).toHaveBeenCalledTimes(
                1
            )
        })

        it('should not find mission', async () => {
            await expect(
                lobbyService.setMission(
                    '1',
                    { _id: 'novalidmission' } as Mission,
                    session
                )
            ).rejects.toThrow('Mission not found')
            expect(deps.lobbyRepoMock.findLobbyByGroupId).toHaveBeenCalledTimes(
                1
            )
        })

        it('should not be the owner', async () => {
            mockData.lobby = <any>{
                _id: '',
                owner: { _id: 'someoneelse' },
                group: {
                    groupMembers: [{}, {}, {}, {}, {}],
                },
                maxAllowedPlayer: 5,
            }
            await expect(
                lobbyService.setMission('1', missions[0] as Mission, session)
            ).rejects.toThrow('Session is not the lobby owner')
            expect(deps.lobbyRepoMock.findLobbyByGroupId).toHaveBeenCalledTimes(
                1
            )
        })
    })
})
