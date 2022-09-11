import { Injectable } from '@angular/core';

const SESSION_ID_KEY = 'sessionID'

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  setSessionID = (key: string) => {
    return localStorage.setItem(SESSION_ID_KEY, key)
  }

  getSessionID = () => {
    return localStorage.getItem(SESSION_ID_KEY)
  }
}
