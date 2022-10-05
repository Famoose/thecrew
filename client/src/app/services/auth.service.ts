import { Injectable } from '@angular/core'
import { Subject } from 'rxjs'

const SESSION_ID_KEY = 'sessionID'
const USER_ID_KEY = 'userID'

@Injectable({
    providedIn: 'root',
})
export class AuthService {
    onUpdateCredentials$ = new Subject<string>()

    setSessionID(key: string) {
        if (key !== this.getSessionID()) {
            console.log('update session: ' + key)
            this.onUpdateCredentials$.next(key)
            return localStorage.setItem(SESSION_ID_KEY, key)
        }
    }

    getSessionID() {
        return localStorage.getItem(SESSION_ID_KEY)
    }

    setUserID(userID: string) {
        return localStorage.setItem(USER_ID_KEY, userID)
    }
    getUserID() {
        return localStorage.getItem(USER_ID_KEY)
    }
}
