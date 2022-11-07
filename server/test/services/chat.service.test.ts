import { GroupService } from '../../src/services/group.service'
import { createMocks, mockData } from '../mocks'
import { ChatService, createChatService } from '../../src/services/chat.service'

describe('chat service tests', () => {
    let chatService: ChatService
    let deps: {
        groupServiceMock: GroupService
    }
    beforeEach(() => {
        deps = createMocks(mockData)
        chatService = createChatService(deps.groupServiceMock)
    })

    describe('isSessionInChatGroup', () => {
        const session = { _id: '1', userID: '1' }
        it('should find session in chat group', async () => {
            expect(await chatService.isSessionInChatGroup('1', session)).toBe(
                mockData.group
            )
            expect(
                deps.groupServiceMock.isSessionInGroup
            ).toHaveBeenCalledTimes(1)
            expect(deps.groupServiceMock.findGroupById).toHaveBeenCalledTimes(1)
        })
    })
})
