import { Session, SessionRepository } from '../repositories/session.repository'

export type SessionService = {
    findSession(id: string): Promise<Session | null>
    createSession(session: Session): Promise<boolean>
    findAllSessions(): Promise<Session[]>
    checkValidSession(sessionID: string | undefined): Promise<Session>
    anonymizeSession(session: Session): { userID: string }
}

export const createSessionService = (
    sessionRepository: SessionRepository
): SessionService => {
    const findSession = sessionRepository.findSession
    const createSession = sessionRepository.createSession
    const findAllSessions = sessionRepository.findAllSessions

    const checkValidSession = async (sessionID: string | undefined) => {
        const foundSession = await findSession(sessionID || '')
        if (!foundSession) {
            throw new Error(`no session found for ID: ${sessionID}`)
        }
        return foundSession
    }

    const anonymizeSession = (session: Session) => {
        return { userID: session.userID }
    }

    return {
        findSession,
        createSession,
        findAllSessions,
        checkValidSession,
        anonymizeSession,
    }
}
