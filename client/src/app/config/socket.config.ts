import {Injectable} from '@angular/core';
import {Socket} from 'ngx-socket-io';
import {AuthService} from "../services/auth.service";

@Injectable()
export class MainSocket extends Socket {
  constructor(private authService: AuthService) {
    super({
      url: '', options: {
        path: '/api',
      }
    })
    this.ioSocket.query = {
      token: (() => this.authService.getSessionID() ? this.authService.getSessionID() : '')()
    };
  }
}

@Injectable()
export class LobbySocket extends Socket {
  constructor(private authService: AuthService) {
    super({
      url: '/lobby', options: {
        path: '/api',
      }
    });
    this.ioSocket.query = {
      token: (() => this.authService.getSessionID() ? this.authService.getSessionID() : '')()
    };
  }
}

@Injectable()
export class ChatSocket extends Socket {
  constructor(private authService: AuthService) {
    super({
      url: '/chat', options: {
        path: '/api',
      }
    });
    this.ioSocket.query = {
      token: (() => this.authService.getSessionID() ? this.authService.getSessionID() : '')()
    };
  }
}
