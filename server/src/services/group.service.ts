import crypto from 'crypto'

import { Group, GroupRepository } from '../repositories/group.repository'
import { Session } from '../repositories/session.repository'

export type GroupService = {
    createGroup(): Promise<Group>
    joinGroup(id: string, session: Session): Promise<Group>
    findGroupById(id: string): Promise<Group | null>
    leaveGroup(id: string, session: Session): Promise<void>
    findGroupBySession(session: Session): Promise<Group | null>
}

export const createGroupService = (
    groupRepository: GroupRepository
): GroupService => {
    const createGroup = async () => {
        const groupID = crypto.randomUUID()
        const group = { _id: groupID, groupMembers: [] }
        await groupRepository.createGroup(group)
        return group
    }

    const joinGroup = async (id: string, session: Session) => {
        const foundGroup = await groupRepository.findGroup(id)
        if (foundGroup) {
            foundGroup.groupMembers = [...foundGroup.groupMembers, session]
            await groupRepository.updateGroup(foundGroup)
            return foundGroup;
        }
        throw new Error("Group not Found")
    }

    const leaveGroup = async (id: string, session: Session) => {
        const foundGroup = await groupRepository.findGroup(id)
        if (foundGroup) {
            const index = foundGroup.groupMembers.indexOf(session)
            if (index !== -1) {
                foundGroup.groupMembers.splice(index, 1)
                await groupRepository.updateGroup(foundGroup)
            }
        }
    }

    const findGroupBySession = async (session: Session) => {
        return await groupRepository.findGroupBySession(session)
    }

    const findGroupById = async (groupId: string) => {
        return await groupRepository.findGroup(groupId)
    }

    return { createGroup, joinGroup, leaveGroup, findGroupBySession, findGroupById }
}
