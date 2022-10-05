import { GroupService } from './group.service'
import { Session } from '../repositories/session.repository'
import { Group } from '../repositories/group.repository'

export type ChatService = {
    isSessionInChatGroup: (groupId: string, session: Session) => Promise<Group>
}

export const createChatService = (groupService: GroupService): ChatService => {
    const isSessionInChatGroup = async (groupId: string, session: Session) => {
        const group = await groupService.findGroupById(groupId)
        if (group) {
            if (groupService.isSessionInGroup(group, session)) {
                return group
            }
            throw new Error('Session not found in group')
        }
        throw new Error('Group not found')
    }

    return { isSessionInChatGroup }
}
