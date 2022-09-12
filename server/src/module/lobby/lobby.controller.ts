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
        const session = sessionService.checkValidSession(this.data.sessionID)

        const group = groupService.createGroup()
        groupService.joinGroup(group.groupID, session)
        this.join(group.groupID)
        console.info(
            `Session:${this.data.sessionID} joined group: ${group.groupID}`
        )
    }

    const followInvitationLink = function (
        link: string,
        _callback: (arg0: string) => void
    ) {
        const session = sessionService.checkValidSession(this.data.sessionID)
        const foundLobby = lobbies.find(
            (lobby) => lobby.invitationLink === link
        )
        if (
            foundLobby &&
            foundLobby.numAllowedClients > foundLobby.connectedClients.length
        ) {
            //join client to roomID
            this.join(foundLobby.roomID)
            _callback(foundLobby.roomID)

            //add session to list if not added yet
            if (!foundLobby.connectedClients.some((c) => c === session)) {
                foundLobby.connectedClients.push(session)
            }
        } else {
            throw new Error('invitation link not valid')
        }
    }

    return { createLobby, followInvitationLink }
}
