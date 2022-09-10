import {SessionService} from "../../services/session.service";

export const createLobbyController = (sessionService: SessionService) => {
    const createLobby = function (payload: string) {
        // eslint-disable-next-line @typescript-eslint/no-this-alias
        const socket = this
        console.log(socket.id)
        console.log(payload)
    }

    return { createLobby }
}
