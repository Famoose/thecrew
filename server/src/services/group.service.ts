import crypto from 'crypto'

import { Session } from '../repositories/InMemorySessionStorage'
import { GroupRepository } from '../repositories/group.repository'
import { Group } from '../repositories/InMemoryGroupStorage'

export type GroupService = {
    createGroup(): Group
    joinGroup(id: string, session: Session): void
    leaveGroup(id: string, session: Session): void
    findGroupBySession(session: Session): Group | undefined
}

export const createGroupService = (
    groupRepository: GroupRepository
): GroupService => {
    const createGroup = () => {
        const groupID = crypto.randomUUID()
        const group = { groupID, groupMembers: [] }
        groupRepository.saveGroup(groupID, group)
        return group
    }
    const joinGroup = (id: string, session: Session) => {
        const foundGroup = groupRepository.findGroup(id)
        if (foundGroup) {
            foundGroup.groupMembers = [...foundGroup.groupMembers, session]
            groupRepository.saveGroup(id, foundGroup)
        }
    }
    const leaveGroup = (id: string, session: Session) => {
        const foundGroup = groupRepository.findGroup(id)
        if (foundGroup) {
            const index = foundGroup.groupMembers.indexOf(session)
            if (index !== -1) {
                foundGroup.groupMembers.splice(index, 1)
                groupRepository.saveGroup(id, foundGroup)
            }
        }
    }
    const findGroupBySession = (session: Session) => {
        return groupRepository.findGroupBySession(session)
    }
    return { createGroup, joinGroup, leaveGroup, findGroupBySession }
}
