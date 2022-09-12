import { Group, InMemoryGroupStore } from './InMemoryGroupStorage'
import { Session } from './InMemorySessionStorage'

export type GroupRepository = {
    findGroup(id: string): Group | undefined
    saveGroup(id: string, group: Group): void
    findAllGroups(): Group[]
    findGroupBySession(session: Session): Group | undefined
}
//db mock
export const createGroupRepository = (): GroupRepository => {
    const store = new InMemoryGroupStore()

    const findGroup = (id: string) => {
        return store.findGroup(id)
    }
    const saveGroup = (id: string, group: Group) => {
        return store.saveGroup(id, group)
    }
    const findAllGroups = () => {
        return store.findAllGroups()
    }
    const findGroupBySession = (session: Session) => {
        return findAllGroups().find((group) =>
            group.groupMembers.includes(session)
        )
    }

    return { findGroup, saveGroup, findAllGroups, findGroupBySession }
}
