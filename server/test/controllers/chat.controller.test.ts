import { createMockData, createMocks } from '../mocks'
import { ChatService } from '../../src/services/chat.service'
import { SessionService } from '../../src/services/session.service'
import { Namespace } from 'socket.io'
import { createChatController } from '../../src/module/chat/chat.controller'
import { PlayerColor } from '../../src/repositories/group.repository'

describe('chat service tests', () => {
    let chatController: any
    let deps: {
        namespaceMock: Namespace
        chatServiceMock: ChatService
        sessionServiceMock: SessionService
    }

    const mockData = createMockData()

    beforeEach(() => {
        deps = createMocks(mockData)
        chatController = createChatController(
            deps.namespaceMock,
            deps.sessionServiceMock,
            deps.chatServiceMock
        )
        chatController.handshake = { auth: { token: '1' } }
        chatController.join = jest.fn()
    })

    describe('joinChatGroup', () => {
        it('should join chat group', async () => {
            const callback = jest.fn()
            const groupId = '1'
            await chatController.joinChatGroup(groupId, callback)

            expect(chatController.join).toHaveBeenCalledWith(groupId)
            expect(callback).toHaveBeenCalled()
        })
    })

    describe('sendMessage', () => {
        mockData.group = <any>{
            _id: '1',
            colors: { '1': PlayerColor.YELLOW },
        }
        it('should send message', async () => {
            const message = 'babidi'
            const groupId = '1'
            await chatController.sendMessage(groupId, message)

            expect(deps.namespaceMock.to).toHaveBeenCalledWith(groupId)
            expect(deps.namespaceMock.emit).toHaveBeenCalledWith(
                'onMessageSent',
                {
                    groupId,
                    message,
                    session: mockData.session,
                    color: PlayerColor.YELLOW,
                }
            )
        })
    })
})
