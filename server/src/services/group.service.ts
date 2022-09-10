import {Session} from '../repositories/InMemorySessionStorage'
import {GroupRepository} from "../repositories/group.repository";

export type GroupService = {
    createGroup(): void
    joinGroup(id: string, session: Session): void
    leaveGroup(id: string, session: Session): void
}

export const createGroupService = (
    groupRepository: GroupRepository
): GroupService => {
    const createGroup = () => {
        groupRepository.saveGroup(crypto.randomUUID(), {groupMembers: []})
    }
    const joinGroup = (id: string, session: Session) => {
        const foundGroup = groupRepository.findGroup(id);
        if (foundGroup) {
            foundGroup.groupMembers = [...foundGroup.groupMembers, session];
            groupRepository.saveGroup(id, foundGroup);
        }
    }
    const leaveGroup = (id: string, session: Session) => {
        const foundGroup = groupRepository.findGroup(id);
        if (foundGroup) {
            const index = foundGroup.groupMembers.indexOf(session);
            if(index !== -1){
                foundGroup.groupMembers.splice(index, 1);
                groupRepository.saveGroup(id, foundGroup);
            }
        }
    }
    return {createGroup, joinGroup, leaveGroup}
}
