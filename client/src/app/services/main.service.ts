import { Injectable } from '@angular/core'
import { MainSocket } from '../config/socket.config'
import { AuthService } from './auth.service'

@Injectable({
    providedIn: 'root',
})
export class MainService {
    constructor(
        private mainSocket: MainSocket,
        private authService: AuthService
    ) {
        mainSocket.on('connect_error', (err: { message: any }) => {
            console.log(err.message) // prints the message associated with the error
        })
        mainSocket.on('error', (err: { message: any }) => {
            console.log(err.message) // prints the message associated with the error
        })
    }

    authenticate() {
        this.mainSocket.emit(
            'session:get',
            ({ sessionID }: { sessionID: string }) => {
                this.authService.setSessionID(sessionID)
            }
        )
    }
}
