import { Injectable } from '@angular/core'
import { Subject } from 'rxjs'

const SESSION_ID_KEY = 'sessionID'

@Injectable({
    providedIn: 'root',
})
export class AuthService {
    onUpdateCredentials$ = new Subject<string>()

    setSessionID(key: string) {
        this.onUpdateCredentials$.next(key)
        return localStorage.setItem(SESSION_ID_KEY, key)
    }

    getSessionID() {
        return localStorage.getItem(SESSION_ID_KEY)
    }
}
