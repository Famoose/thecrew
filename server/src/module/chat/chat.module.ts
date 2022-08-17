import { createMiddleware } from '../../middleware'
import { Services } from '../../services/services'
import { Session } from '../../repositories/InMemorySessionStorage'
import { ServerSpecifyType } from '../../socket'

type Lobby = {
    invitationLink: string
    roomID: string
    numAllowedClients: number
    connectedClients: Session[]
}

//demo lobby list
const lobbies: Lobby[] = [
    {
        invitationLink: 'test',
        roomID: 'admins',
        numAllowedClients: 3,
        connectedClients: [],
    },
]

export const createChatModule = (io: ServerSpecifyType, services: Services) => {
    const { sessionService } = services

    const namespace = io.of('chat')

    namespace.use(createMiddleware(sessionService).checkSession)

    //todo create controller
    namespace.on('connection', (socket) => {
        const checkValidSession = () => {
            const foundSession = sessionService.findSession(
                socket.data.sessionID || ''
            )
            if (!foundSession) {
                throw new Error('no valid session')
            }
            return foundSession
        }
        socket.on('followInvitationLink', (link, _callback) => {
            const session = checkValidSession()
            const foundLobby = lobbies.find(
                (lobby) => lobby.invitationLink === link
            )
            if (
                foundLobby &&
                foundLobby.numAllowedClients >
                    foundLobby.connectedClients.length
            ) {
                //join client to roomID
                socket.join(foundLobby.roomID)

                //add session to list if not added yet
                if (!foundLobby.connectedClients.some((c) => c === session)) {
                    foundLobby.connectedClients.push(session)
                }
            } else {
                throw new Error('invitation link not valid')
            }
        })
    })
}
