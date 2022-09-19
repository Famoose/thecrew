import { Db } from 'mongodb'
import { Session } from './session.repository'

export type GroupRepository = {
    findGroup(id: string): Promise<Group | null>
    createGroup(group: Group): Promise<boolean>
    updateGroup(group: Group): Promise<boolean>
    findAllGroups(): Promise<Group[]>
    findGroupBySession(session: Session): Promise<Group | null>
}

export type Group = {
    _id: string
    groupMembers: Session[]
}

export const createGroupRepository = (database: Db): GroupRepository => {
    const collection = database.collection<Group>('group')

    const findGroup = async (id: string) => {
        const query = { _id: id }
        return await collection.findOne(query)
    }
    const createGroup = async (group: Group) => {
        const sessionInsertOneResult = await collection.insertOne(group)
        return sessionInsertOneResult.acknowledged
    }
    const updateGroup = async (group: Group) => {
        const query = { _id: group._id }
        const update = {
            $set: {
                groupMembers: group.groupMembers,
            },
        }
        const updateResult = await collection.updateOne(query, update)
        return updateResult.acknowledged
    }
    const findAllGroups = async () => {
        return await collection.find().toArray()
    }
    const findGroupBySession = async (session: Session) => {
        const query = { groupMembers: [session] }

        return await collection.findOne(query)
    }

    return {
        findGroup,
        createGroup,
        updateGroup,
        findAllGroups,
        findGroupBySession,
    }
}
