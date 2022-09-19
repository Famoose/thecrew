import crypto from 'crypto'
import { Socket } from 'socket.io'
import { ExtendedError } from 'socket.io/dist/namespace'
import { SessionService } from './services/session.service'

export const createMiddleware = (storage: SessionService) => {
    const createAndCheckSession = async (
        socket: Socket,
        next: (err?: ExtendedError) => void
    ) => {
        const sessionID = socket.handshake.auth.token
        console.log(`sessionID: ${sessionID} send request`)
        if (sessionID) {
            // find existing session
            const session = await storage.findSession(sessionID)
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

    const checkSession = async (
        socket: Socket,
        next: (err?: ExtendedError) => void
    ) => {
        const sessionID = socket.handshake.auth.token
        console.log(`sessionID: ${sessionID} send request`)
        if (sessionID) {
            // find existing session
            const session = await storage.findSession(sessionID)
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
