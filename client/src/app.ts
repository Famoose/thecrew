import { Search } from './components/Search'

console.log('file loaded')

window.customElements.define('search-result', Search)

import { io, Socket } from 'socket.io-client'
import { ClientToServerEvents, ServerToClientEvents } from './types'

// please note that the types are reversed
const socket: Socket<ServerToClientEvents, ClientToServerEvents> = io('', {
    path: '/api',
})

socket.on('connect', () => {
    console.log(socket.id)
})

socket.emit('hello')
socket.on('noArg', () => {
    console.log(`noArg`)
})

socket.on('basicEmit', (a, b, c) => {
    // a is inferred as number, b as string and c as buffer
    console.log(`${a}, ${b}, ${c}`)
})

socket.on('withAck', (d, _callback) => {
    console.log(`${d}`)
    // d is inferred as string and callback as a function that takes a number as argument
})
