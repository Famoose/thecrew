import { Group } from './repositories/group.repository'
import { Lobby } from './repositories/lobby.repository'
import { Session } from './repositories/session.repository'
import { Game } from './repositories/game.repository'

export { Lobby, Group, Session, Game }

export interface ServerToClientEvents {
    session: (session: { sessionID: string; userID: string }) => void
    onMessageSent: (message: { groupId: string; message: string }) => void
    'lobby:gameStarted': (game: Game) => void
    'game:updated': (game: Game) => void
    'lobby:updated': (lobby: Lobby) => void
    'lobby:list:updated': () => void
}

export interface ClientToServerEvents {
    'lobby:join': (
        groupId: string,
        _callback: (lobby: Lobby | null) => void
    ) => void
    'lobby:create': (_callback: (groupId: string | null) => void) => void
    'lobby:all': (_callback: (lobbies: Lobby[]) => void) => void
    'lobby:startGame': (groupId: string) => void

    'game:get': (
        groupId: string,
        _callback: (game: Game | null) => void
    ) => void

    joinChatGroup: (groupId: string, _callback: () => void) => void
    sendMessage: (groupId: string, message: string) => void
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
