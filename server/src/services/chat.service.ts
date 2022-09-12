import { Session } from '../repositories/InMemorySessionStorage'

import { GroupService } from './group.service'

export type ChatService = {
    tryGetChatGroupID: (session: Session) => string
}

export const createChatService = (groupService: GroupService): ChatService => {
    const tryGetChatGroup = (session: Session) => {
        const group = groupService.findGroupBySession(session)
        if (group) {
            return group.groupID
        } else {
            throw new Error('Session not found in any group')
        }
    }

    return { tryGetChatGroupID: tryGetChatGroup }
}
