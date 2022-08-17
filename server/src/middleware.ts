import crypto from 'crypto'
import { Socket } from 'socket.io'
import { ExtendedError } from 'socket.io/dist/namespace'
import { SessionService } from './services/session.service'

export const createMiddleware = (storage: SessionService) => {
    const createAndCheckSession = (
        socket: Socket,
        next: (err?: ExtendedError) => void
    ) => {
        const sessionID = socket.handshake.auth.sessionID
        if (sessionID) {
            // find existing session
            const session = storage.findSession(sessionID)
            if (session) {
                socket.data.sessionID = sessionID
                socket.data.userID = session.userID
                return next()
            }
        }
        // create new session
        socket.data.sessionID = crypto.randomUUID()
        socket.data.userID = crypto.randomUUID()
        next()
    }

    const checkSession = (
        socket: Socket,
        next: (err?: ExtendedError) => void
    ) => {
        const sessionID = socket.handshake.auth.sessionID
        if (sessionID) {
            // find existing session
            const session = storage.findSession(sessionID)
            if (session) {
                socket.data.sessionID = sessionID
                socket.data.userID = session.userID
                return next()
            }
        }
        next(new Error('no valid session found'))
    }

    return { createAndCheckSession, checkSession }
}
