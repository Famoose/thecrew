import { Socket } from 'socket.io'
import { Services } from '../../services/services'
import { createMiddleware } from '../../middleware'
import { ServerSpecifyType } from '../../socket'

export const createMainModule = (io: ServerSpecifyType, services: Services) => {
    const { sessionService } = services

    io.use(createMiddleware(sessionService).createAndCheckSession)

    io.on('connection', (socket: Socket) => {
        const sessionID = socket.data.sessionID || ''

        sessionService.saveSession(sessionID, {
            userID: socket.data.userID || '',
        })

        socket.emit('session', {
            sessionID: socket.data.sessionID || '',
            userID: socket.data.userID || '',
        })

        socket.on('session:get', (_callback) => {
            console.log('server:session:get')
            _callback({
                sessionID: socket.data.sessionID || '',
                userID: socket.data.userID || '',
            })
        })
    })
}
