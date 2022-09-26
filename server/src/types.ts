import { Group } from './repositories/group.repository'
import { Lobby } from './repositories/lobby.repository'
import { Session } from './repositories/session.repository'

export { Lobby, Group, Session }

export interface ServerToClientEvents {
    session: (session: { sessionID: string; userID: string }) => void
    onMessageSent: (message: string) => void
}

export interface ClientToServerEvents {
    'lobby:join': (
        groupId: string,
        _callback: (lobby: Lobby | null) => void
    ) => void
    'lobby:create': (_callback: (groupId: string | null) => void) => void
    'lobby:all': (_callback: (lobbies: Lobby[]) => void) => void

    joinChatGroup: () => void
    sendMessage: (message: string) => void
    'session:get': (
        _callback: ({
            sessionID,
            userID,
        }: {
            sessionID: string
            userID: string
        }) => void
    ) => void
}

export interface InterServerEvents {
    ping: () => void
}

export interface SocketData {
    sessionID: string
    userID: string
}
