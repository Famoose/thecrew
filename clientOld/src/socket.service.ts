import { io, Socket } from 'socket.io-client'
import { ClientToServerEvents, ServerToClientEvents } from './types'

const SESSION_ID_KEY = 'sessionID'
const setSessionID = (key: string) => {
    return localStorage.setItem(SESSION_ID_KEY, key)
}
const getSessionID = () => {
    return localStorage.getItem(SESSION_ID_KEY)
}

const socket: Socket<ServerToClientEvents, ClientToServerEvents> = io('', {
    path: '/api',
    auth: { sessionID: getSessionID() },
    autoConnect: false,
})

const socketChat: Socket<ServerToClientEvents, ClientToServerEvents> = io(
    '/chat',
    {
        path: '/api',
        auth: { sessionID: getSessionID() },
        autoConnect: false,
    }
)

const socketLobby: Socket<ServerToClientEvents, ClientToServerEvents> = io(
    '/lobby',
    {
        path: '/api',
        auth: { sessionID: getSessionID() },
        autoConnect: false,
    }
)

export const connect = () => {
    socket.connect()

    socket.on('connect', () => {
        socket.emit('followInvitationLink', 'test', (roomID: string) => {
            console.log(roomID)
        })
    })

    socket.on('session', ({ sessionID }) => {
        socket.auth = { sessionID }
        setSessionID(sessionID)
    })

    socket.on('connect_error', (err) => {
        console.log(err)
    })

    socketChat.connect()

    socketLobby.connect()
    socketLobby.emit('lobby:create', 'new lobby')
}
