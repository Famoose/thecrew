import { Session } from './InMemorySessionStorage'

export interface GroupStorage {
    findGroup(id: string): Group | undefined
    saveGroup(id: string, group: Group): void
    findAllGroups(): Group[]
}

export type Group = {
    groupID: string
    groupMembers: Session[]
}

export class InMemoryGroupStore implements GroupStorage {
    groups: Map<string, Group>

    constructor() {
        this.groups = new Map()
    }

    findGroup(id: string) {
        return this.groups.get(id)
    }

    saveGroup(id: string, group: Group) {
        this.groups.set(id, group)
    }

    findAllGroups() {
        return [...this.groups.values()]
    }
}
