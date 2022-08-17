import http from 'http'
import { createServerSocket } from './socket'
import { createLobbyModule } from './module/lobby/lobby.module'
import { createServices } from './services/services'
import { createRepositories } from './repositories/repositories'
import { Server } from 'socket.io'
import { createMainModule } from './module/main/main.module'
import { createChatModule } from './module/chat/chat.module'

const httpServer = http.createServer()

const repositories = createRepositories()
const services = createServices(repositories)

const modules = [
    (io: Server) => {
        createMainModule(io, services)
    },
    (io: Server) => {
        createLobbyModule(io, services)
    },
    (io: Server) => {
        createChatModule(io, services)
    },
]
createServerSocket(httpServer, modules)

httpServer.listen(8080)
