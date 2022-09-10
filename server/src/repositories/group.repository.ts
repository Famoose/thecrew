import {Group, InMemoryGroupStore} from "./InMemoryGroupStorage";

export type GroupRepository = {
    findGroup(id: string): Group | undefined
    saveGroup(id: string, group: Group): void
    findAllGroups(): Group[]
}
//db mock
export const createSessionRepository = (): GroupRepository => {
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

    return { findGroup, saveGroup, findAllGroups }
}
