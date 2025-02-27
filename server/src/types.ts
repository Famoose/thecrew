import { Group, PlayerColor } from './repositories/group.repository'
import { Lobby, LobbyStatus } from './repositories/lobby.repository'
import { Session } from './repositories/session.repository'
import { Game, QuestPlayer } from './repositories/game.repository'
import { Mission } from './data/missions'
import { Card } from './data/cards'

export { Lobby, Group, Session, Game, PlayerColor, QuestPlayer, LobbyStatus }
export type Message = {
    groupId: string
    message: string
    session: Session
    color: PlayerColor
}

export interface ServerToClientEvents {
    session: (session: { sessionID: string; userID: string }) => void
    onMessageSent: (message: Message) => void
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
    'lobby:setMission': (groupId: string, mission: Mission) => void

    'game:get': (
        groupId: string,
        _callback: (game: Game | null) => void
    ) => void
    'game:playCard': (
        gameId: string,
        card: Card,
        _callback: (success: boolean) => void
    ) => void

    joinChatGroup: (groupId: string, _callback: () => void) => void
    sendMessage: (groupId: string, message: string) => void
    'session:get': (_callback: (session: Session) => void) => void
}

export interface InterServerEvents {
    ping: () => void
}

export interface SocketData {
    sessionID: string
    userID: string
}
