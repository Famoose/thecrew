import { Db } from 'mongodb'

export type Session = {
    _id: string
    userID: string
}

export type SessionRepository = {
    findSession(id: string): Promise<Session | null>
    createSession(session: Session): Promise<boolean>
    findAllSessions(): Promise<Session[]>
}

export const createSessionRepository = (database: Db): SessionRepository => {
    const collection = database.collection<Session>('session')

    const findSession = async (id: string) => {
        const query = { _id: id }
        return await collection.findOne(query)
    }
    const createSession = async (session: Session) => {
        const sessionInsertOneResult = await collection.insertOne(session)
        return sessionInsertOneResult.acknowledged
    }
    const findAllSessions = async () => {
        return await collection.find().toArray()
    }

    return { findSession, createSession, findAllSessions }
}
