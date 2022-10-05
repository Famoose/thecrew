import { Injectable } from '@angular/core'
import { MainSocket } from '../config/socket.config'
import { AuthService } from './auth.service'
import { Router } from '@angular/router'
import { Observable } from 'rxjs'
import { Session } from 'src/types'

@Injectable({
    providedIn: 'root',
})
export class MainService {
    constructor(
        private mainSocket: MainSocket,
        private authService: AuthService,
        private router: Router
    ) {
        mainSocket.on('connect_error', (err: { message: any }) => {
            console.log(err.message) // prints the message associated with the error
        })
        mainSocket.on('error', (err: { message: any }) => {
            console.log(err.message) // prints the message associated with the error
        })
    }

    authenticate() {
        return new Observable<Session>((observer) => {
            this.mainSocket.emit('session:get', (session: Session) => {
                this.authService.setSessionID(session._id)
                this.authService.setUserID(session.userID)
                observer.next(session)
            })
        })
    }
}
