import {
    createGroupService,
    GroupService,
} from '../../src/services/group.service'
import { createMocks, mockData } from '../mocks'
import {
    GroupRepository,
    PlayerColor,
} from '../../src/repositories/group.repository'

describe('group service tests', () => {
    let groupService: GroupService
    let deps: {
        groupRepoMock: GroupRepository
    }
    beforeEach(() => {
        deps = createMocks(mockData)
        groupService = createGroupService(deps.groupRepoMock)
    })

    describe('createGroup', () => {
        it('should create group', async () => {
            const group = await groupService.createGroup()
            expect(group._id).toBeDefined()
            expect(group.groupMembers).toEqual([])
            expect(group.availableColors).toEqual([
                PlayerColor.BLUE,
                PlayerColor.RED,
                PlayerColor.GREEN,
                PlayerColor.YELLOW,
                PlayerColor.PURPLE,
                PlayerColor.ORANGE,
            ])
            expect(group.colors).toEqual({})
            expect(deps.groupRepoMock.createGroup).toHaveBeenCalledTimes(1)
        })
    })

    describe('joinGroup', () => {
        const session = { _id: '1', userID: '1' }
        mockData.group = <any>{
            _id: '1',
            groupMembers: [],
            availableColors: [PlayerColor.YELLOW],
            colors: {},
        }
        it('should create group', async () => {
            const group = await groupService.joinGroup('id', session)
            expect(group.groupMembers).toContain(session)
            expect(group.colors[session.userID]).toEqual(PlayerColor.YELLOW)
            expect(deps.groupRepoMock.updateGroup).toHaveBeenCalledTimes(1)
        })
    })

    describe('leaveGroup', () => {
        const session = { _id: '1', userID: '1' }
        mockData.group = <any>{
            _id: '1',
            groupMembers: [session],
            availableColors: [PlayerColor.YELLOW],
            colors: {},
        }
        it('should leave group', async () => {
            const group = await groupService.leaveGroup('id', session)
            expect(group.groupMembers).toHaveLength(0)
            expect(deps.groupRepoMock.updateGroup).toHaveBeenCalledTimes(1)
        })
    })

    describe('findGroup', () => {
        const session = { _id: '1', userID: '1' }
        it('should find group by session', async () => {
            expect(await groupService.findGroupBySession(session)).toBe(
                mockData.group
            )
            expect(deps.groupRepoMock.findGroupBySession).toHaveBeenCalledTimes(
                1
            )
        })

        it('should find group by id', async () => {
            expect(await groupService.findGroupById('1')).toBe(mockData.group)
            expect(deps.groupRepoMock.findGroup).toHaveBeenCalledTimes(1)
        })
    })

    describe('isSessionInGroup', () => {
        const session = { _id: '1', userID: '1' }
        const group = <any>{
            _id: '1',
            groupMembers: [session, {}, {}],
        }
        it('should find session in group', async () => {
            expect(groupService.isSessionInGroup(group, session)).toBeTruthy()
        })

        it('should not find session in group', async () => {
            group.groupMembers = [{}, {}]
            expect(groupService.isSessionInGroup(group, session)).toBeFalsy()
        })
    })
})
