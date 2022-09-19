import http from 'http'
import { createServerSocket } from './socket'
import { createLobbyModule } from './module/lobby/lobby.module'
import { createServices } from './services/services'
import { createRepositories } from './repositories/repositories'
import { Server } from 'socket.io'
import { createMainModule } from './module/main/main.module'
import { createChatModule } from './module/chat/chat.module'
import { MongoClient } from 'mongodb'

const httpServer = http.createServer()

const DB_USER = 'root'
const DB_PASSWORD = 'example'
const DB_URL = 'localhost:27017'
const DB_DATABASE = 'thecrew'

const uri = `mongodb://${DB_USER}:${DB_PASSWORD}@${DB_URL}?retryWrites=true&w=majority`
const client = new MongoClient(uri)
const database = client.db(DB_DATABASE)

const repositories = createRepositories(database)
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
