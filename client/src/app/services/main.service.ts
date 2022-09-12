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
    ) {}

    authenticate() {
        this.mainSocket.emit(
            'session:get',
            ({ sessionID }: { sessionID: string }) => {
                this.authService.setSessionID(sessionID)
            }
        )
    }
}
