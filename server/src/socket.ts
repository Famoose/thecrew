import { Server } from 'socket.io'
import {
    ClientToServerEvents,
    InterServerEvents,
    ServerToClientEvents,
    SocketData,
} from './types'
import http from 'http'
import { ServerModule } from './module/types'

export type ServerSpecifyType = Server<
    ClientToServerEvents,
    ServerToClientEvents,
    InterServerEvents,
    SocketData
>
export const createServerSocket = (
    httpServer: http.Server,
    modules: ServerModule[]
) => {
    const io = new Server<
        ClientToServerEvents,
        ServerToClientEvents,
        InterServerEvents,
        SocketData
    >(httpServer)

    modules.forEach((module) => {
        module(io)
    })

    return io
}
