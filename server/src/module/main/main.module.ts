import { Socket } from 'socket.io'
import { Services } from '../../services/services'
import { createMiddleware } from '../../middleware'
import { ServerSpecifyType } from '../../socket'

export const createMainModule = (io: ServerSpecifyType, services: Services) => {
    const { sessionService } = services

    io.use(createMiddleware(sessionService).createAndCheckSession)

    io.on('connection', async (socket: Socket) => {
        const sessionID = socket.data.sessionID || ''

        const session = await sessionService.findSession(sessionID)

        if (!session) {
            await sessionService.createSession({
                _id: sessionID,
                userID: socket.data.userID || '',
            })
            console.log(`stored new session: ${sessionID}`)
        }

        socket.emit('session', {
            sessionID: socket.data.sessionID || '',
            userID: socket.data.userID || '',
        })

        socket.on('session:get', (_callback) => {
            _callback({
                sessionID: socket.data.sessionID || '',
                userID: socket.data.userID || '',
            })
        })
    })
}
