export interface SessionStorage {
    findSession(id: string): Session | undefined

    saveSession(id: string, session: Session): void

    findAllSessions(): Session[]
}

export type Session = {
    userID: string
}

export class InMemorySessionStore implements SessionStorage {
    sessions: Map<string, Session>

    constructor() {
        this.sessions = new Map()
    }

    findSession(id: string) {
        return this.sessions.get(id)
    }

    saveSession(id: string, session: Session) {
        this.sessions.set(id, session)
    }

    findAllSessions() {
        return [...this.sessions.values()]
    }
}
