import crypto from 'crypto'

import {
    Group,
    GroupRepository,
    PlayerColor,
} from '../repositories/group.repository'
import { Session } from '../repositories/session.repository'

export type GroupService = {
    createGroup(): Promise<Group>
    joinGroup(id: string, session: Session): Promise<Group>
    findGroupById(id: string): Promise<Group | null>
    leaveGroup(id: string, session: Session): Promise<Group>
    findGroupBySession(session: Session): Promise<Group | null>
    isSessionInGroup(group: Group, session: Session): boolean
}

export const createGroupService = (
    groupRepository: GroupRepository
): GroupService => {
    const createGroup = async () => {
        const groupID = crypto.randomUUID()
        const group = {
            _id: groupID,
            groupMembers: [],
            colors: {},
            availableColors: [
                PlayerColor.BLUE,
                PlayerColor.RED,
                PlayerColor.GREEN,
                PlayerColor.YELLOW,
                PlayerColor.PURPLE,
                PlayerColor.ORANGE,
            ],
        }
        await groupRepository.createGroup(group)
        return group
    }

    const joinGroup = async (id: string, session: Session) => {
        const foundGroup = await groupRepository.findGroup(id)
        if (foundGroup) {
            foundGroup.groupMembers = [...foundGroup.groupMembers, session]
            const color = foundGroup.availableColors.pop()
            if (color) {
                foundGroup.colors[session.userID] = color
            } else {
                //more than 5 players, should normally not happen
                foundGroup.colors[session.userID] = PlayerColor.BLACK
            }
            await groupRepository.updateGroup(foundGroup)
            return foundGroup
        }
        throw new Error('Group not Found')
    }

    const leaveGroup = async (id: string, session: Session) => {
        const foundGroup = await groupRepository.findGroup(id)
        if (foundGroup) {
            const index = findSessionInGroup(foundGroup, session)
            if (index !== -1) {
                foundGroup.groupMembers.splice(index, 1)
                await groupRepository.updateGroup(foundGroup)
                return foundGroup
            }
        }
        throw new Error('Group not Found')
    }

    const findGroupBySession = async (session: Session) => {
        return await groupRepository.findGroupBySession(session)
    }

    const findGroupById = async (groupId: string) => {
        return await groupRepository.findGroup(groupId)
    }

    const isSessionInGroup = (group: Group, session: Session) => {
        return (
            group.groupMembers.find((member) => member._id === session._id) !==
            undefined
        )
    }

    const findSessionInGroup = (group: Group, session: Session) => {
        return group.groupMembers.findIndex(
            (member) => member._id === session._id
        )
    }

    return {
        createGroup,
        joinGroup,
        leaveGroup,
        findGroupBySession,
        findGroupById,
        isSessionInGroup,
    }
}
