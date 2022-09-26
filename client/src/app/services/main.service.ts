import { Injectable } from '@angular/core'
import { MainSocket } from '../config/socket.config'
import { AuthService } from './auth.service'
import { Router } from '@angular/router'
import { Observable } from 'rxjs'

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
        return new Observable<string>((observer) => {
            this.mainSocket.emit(
                'session:get',
                ({ sessionID }: { sessionID: string }) => {
                    this.authService.setSessionID(sessionID)
                    observer.next(sessionID)
                }
            )
        })
    }
}
