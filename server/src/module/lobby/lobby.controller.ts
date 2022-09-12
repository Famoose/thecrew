import { GroupService } from '../../services/group.service'
import { SessionService } from '../../services/session.service'
import { Session } from '../../repositories/InMemorySessionStorage'

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

export const createLobbyController = (
    sessionService: SessionService,
    groupService: GroupService
) => {
    const createLobby = function () {
        try {
            const session = sessionService.checkValidSession(
                this.handshake.auth.token
            )
            const group = groupService.createGroup()
            groupService.joinGroup(group.groupID, session)
            this.join(group.groupID)
            console.info(
                `Session:${session.userID} joined group: ${group.groupID}`
            )
        } catch (e) {
            console.error(e)
        }
    }

    const followInvitationLink = function (
        link: string,
        _callback: (arg0: string) => void
    ) {
        try {
            const session = sessionService.checkValidSession(
                this.handshake.auth.token
            )
            const foundLobby = lobbies.find(
                (lobby) => lobby.invitationLink === link
            )
            if (
                foundLobby &&
                foundLobby.numAllowedClients >
                    foundLobby.connectedClients.length
            ) {
                //join client to roomID
                this.join(foundLobby.roomID)
                _callback(foundLobby.roomID)

                //add session to list if not added yet
                if (!foundLobby.connectedClients.some((c) => c === session)) {
                    foundLobby.connectedClients.push(session)
                }
            }
            console.error('invitation link not valid')
        } catch (e) {
            console.error(e)
        }
    }

    return { createLobby, followInvitationLink }
}
