export interface ServerToClientEvents {
    noArg: () => void
    basicEmit: (a: number, b: string, c: Buffer) => void
    withAck: (d: string, callback: (e: number) => void) => void
    session: (session: { sessionID: string; userID: string }) => void
}

export interface ClientToServerEvents {
    followInvitationLink: (
        link: string,
        _callback: (roomID: string) => void
    ) => void
    'lobby:create': (p: string) => void
}

export interface InterServerEvents {
    ping: () => void
}

export interface SocketData {
    sessionID: string
    userID: string
}
