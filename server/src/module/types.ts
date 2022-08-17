import { Server } from 'socket.io'

export type ServerModule = (io: Server) => void
