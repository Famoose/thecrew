import { Server } from 'socket.io'
import http from 'http'
import {
    ClientToServerEvents,
    InterServerEvents,
    ServerToClientEvents,
    SocketData,
} from './types'

const httpServer = http.createServer()

console.log('hallo welt')

const io = new Server<
    ClientToServerEvents,
    ServerToClientEvents,
    InterServerEvents,
    SocketData
>(httpServer)

io.on('connection', (socket) => {
    console.log(socket.id)
    socket.emit('noArg')
    socket.emit('basicEmit', 1, '2', Buffer.from([3]))
    socket.emit('withAck', '4', (_e) => {
        // e is inferred as number
        console.log(`${_e} ack`)
    })

    // works when broadcast to all
    io.emit('noArg')

    // works when broadcasting to a room
    io.to('room1').emit('basicEmit', 1, '2', Buffer.from([3]))
})

httpServer.listen(8080)
