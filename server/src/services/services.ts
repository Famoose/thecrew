import { createSessionService, SessionService } from './session.service'
import { Repositories } from '../repositories/repositories'
import { createGroupService, GroupService } from './group.service'
import { ChatService, createChatService } from './chat.service'

export type Services = {
    sessionService: SessionService
    groupService: GroupService
    chatService: ChatService
}
export const createServices = (repositories: Repositories): Services => {
    const sessionService = createSessionService(repositories.sessionRepository)
    const groupService = createGroupService(repositories.groupRepository)
    const chatService = createChatService(groupService)
    return { sessionService, groupService, chatService }
}
