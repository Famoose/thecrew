export interface ServerToClientEvents {
    session: (session: { sessionID: string; userID: string }) => void
    onMessageSent: (message: string) => void
}

export interface ClientToServerEvents {
    followInvitationLink: (
        link: string,
        _callback: (roomID: string) => void
    ) => void
    'lobby:create': (p: string) => void

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
