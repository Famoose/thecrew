import {GroupService} from '../../services/group.service'
import {SessionService} from '../../services/session.service'
import {LobbyService} from "../../services/lobby.service";
import {Lobby} from "../../repositories/lobby.repository";

export const createLobbyController = (
    sessionService: SessionService,
    groupService: GroupService,
    lobbyService: LobbyService
) => {
    const createLobby = async function (_callback: (groupId: string | null) => void) {
        try {
            const session = await sessionService.checkValidSession(
                this.handshake.auth.token
            )
            let group = await groupService.createGroup()
            group = await groupService.joinGroup(group._id, session)
            this.join(group._id)
            console.info(`Session:${session.userID} joined group: ${group._id}`)
            await lobbyService.createLobby(group);
            _callback(group._id)
        } catch (e) {
            console.error(e)
            _callback(null)
        }
    }

    const joinLobby = async function (
        groupId: string,
        _callback: (lobby: Lobby | null) => void
    ) {
        try {
            const session = await sessionService.checkValidSession(
                this.handshake.auth.token
            )
            const group = await groupService.findGroupById(groupId);

            if (group) {
                const lobby = await lobbyService.findLobbyByGroup(group);
                if (lobby) {
                    if (group.groupMembers.find((member) => member._id === session._id)) {
                        _callback(lobby)
                        return;
                    }
                    if (lobby.maxAllowedPlayer > lobby.group.groupMembers.length) {
                        lobby.group = await groupService.joinGroup(groupId, session);
                        await lobbyService.updateLobby(lobby);
                        _callback(lobby);
                        return;
                    }
                    console.error('lobby is full')
                    _callback(null);
                    return;
                }
                console.error('lobby not found')
                _callback(null);
                return;
            }
            console.error('group not found')
            _callback(null);
            return;

        } catch (e) {
            console.error(e)
        }
    }

    const listLobbies = async function (_callback: (lobbies: Lobby[]) => void) {
        try {
            const lobbies = await lobbyService.findAllLobbies();
            _callback(lobbies);
        } catch (e) {
            console.error(e)
        }
    }

    return {createLobby, joinLobby, listLobbies}
}
