import { createSessionService, SessionService } from './session.service'
import { Repositories } from '../repositories/repositories'
import { createGroupService, GroupService } from './group.service'
import { ChatService, createChatService } from './chat.service'
import { createLobbyService, LobbyService } from './lobby.service'

export type Services = {
    sessionService: SessionService
    groupService: GroupService
    chatService: ChatService
    lobbyService: LobbyService
}
export const createServices = (repositories: Repositories): Services => {
    const sessionService = createSessionService(repositories.sessionRepository)
    const groupService = createGroupService(repositories.groupRepository)
    const chatService = createChatService(groupService)
    const lobbyService = createLobbyService(
        repositories.lobbyRepository,
        groupService
    )
    return { sessionService, groupService, chatService, lobbyService }
}
