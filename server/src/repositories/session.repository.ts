import { InMemorySessionStore, Session } from './InMemorySessionStorage'

export type SessionRepository = {
    findSession(id: string): Session | undefined
    saveSession(id: string, session: Session): void
    findAllSessions(): Session[]
}
//db mock
export const createSessionRepository = (): SessionRepository => {
    const store = new InMemorySessionStore()

    const findSession = (id: string) => {
        return store.findSession(id)
    }
    const saveSession = (id: string, session: Session) => {
        return store.saveSession(id, session)
    }
    const findAllSessions = () => {
        return store.findAllSessions()
    }

    return { findSession, saveSession, findAllSessions }
}
