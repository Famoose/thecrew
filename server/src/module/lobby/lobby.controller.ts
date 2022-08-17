export const createLobbyController = () => {
    const createLobby = function (payload: string) {
        // eslint-disable-next-line @typescript-eslint/no-this-alias
        const socket = this
        console.log(socket.id)
        console.log(payload)
    }

    return { createLobby }
}
