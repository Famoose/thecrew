import { Socket } from 'socket.io'
import { Services } from '../../services/services'
import { createMiddleware } from '../../middleware'
import { ServerSpecifyType } from '../../socket'

export const createMainModule = (io: ServerSpecifyType, services: Services) => {
    const { sessionService } = services

    io.use(createMiddleware(sessionService).createAndCheckSession)

    io.on('connection', (socket: Socket) => {
        console.log(socket.id)

        const sessionID = socket.data.sessionID || ''
        sessionService.saveSession(sessionID, {
            userID: socket.data.userID || '',
        })

        socket.emit('session', {
            sessionID: socket.data.sessionID || '',
            userID: socket.data.userID || '',
        })
        socket.emit('')
    })
}
