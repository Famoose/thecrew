import { GroupService } from './group.service'
import { Session } from '../repositories/session.repository'

export type ChatService = {
    tryGetChatGroupID: (session: Session) => Promise<string>
}

export const createChatService = (groupService: GroupService): ChatService => {
    const tryGetChatGroupID = async (session: Session) => {
        const group = await groupService.findGroupBySession(session)
        if (group) {
            return group._id
        } else {
            throw new Error('Session not found in any group')
        }
    }

    return { tryGetChatGroupID }
}
