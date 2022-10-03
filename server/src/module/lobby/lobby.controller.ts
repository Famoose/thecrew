import { GroupService } from '../../services/group.service'
import { SessionService } from '../../services/session.service'
import { LobbyService } from '../../services/lobby.service'
import { Lobby } from '../../repositories/lobby.repository'
import { Namespace } from 'socket.io'
import { GameService } from '../../services/game.service'

export const createLobbyController = (
    namespace: Namespace,
    sessionService: SessionService,
    groupService: GroupService,
    lobbyService: LobbyService,
    gameService: GameService
) => {
    const createLobby = async function (
        _callback: (groupId: string | null) => void
    ) {
        try {
            const session = await sessionService.checkValidSession(
                this.handshake.auth.token
            )
            let group = await groupService.createGroup()
            group = await groupService.joinGroup(group._id, session)
            console.info(`Session:${session.userID} joined group: ${group._id}`)
            namespace.emit('lobby:list:changed')
            await lobbyService.createLobby(group, session)
            this.join(group._id)
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
            const lobby = await lobbyService.joinLobby(groupId, session)
            this.join(lobby.group._id)
            namespace.to(lobby.group._id).emit('lobby:changed', lobby)
            namespace.emit('lobby:list:changed')
            _callback(lobby)
        } catch (e) {
            console.error(e)
            _callback(null)
        }
    }

    const listLobbies = async function (_callback: (lobbies: Lobby[]) => void) {
        try {
            const lobbies = await lobbyService.findAllLobbies()
            _callback(lobbies)
        } catch (e) {
            console.error(e)
            _callback([])
        }
    }

    const startGame = async function (groupId: string) {
        try {
            const session = await sessionService.checkValidSession(
                this.handshake.auth.token
            )
            const game = await gameService.startGame(groupId, session)
            const lobby = await lobbyService.findLobbyByGroupId(groupId)
            if (lobby) {
                namespace.to(lobby.group._id).emit('lobby:changed', lobby)
                namespace.to(lobby.group._id).emit('lobby:gameStarted', game)
                namespace.emit('lobby:list:changed')
            }
        } catch (e) {
            console.error(e)
        }
    }

    return { createLobby, joinLobby, listLobbies, startGame }
}
