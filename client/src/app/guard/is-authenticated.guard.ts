import { Injectable } from '@angular/core'
import {
    ActivatedRouteSnapshot,
    CanActivate,
    Router,
    RouterStateSnapshot,
    UrlTree,
} from '@angular/router'
import { delay, map, Observable, of, throttleTime } from 'rxjs'
import { AuthService } from '../services/auth.service'
import { MainService } from '../services/main.service'

@Injectable({
    providedIn: 'root',
})
export class IsAuthenticatedGuard implements CanActivate {
    constructor(
        private authService: AuthService,
        private router: Router,
        private mainService: MainService
    ) {}

    canActivate(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
    ):
        | Observable<boolean | UrlTree>
        | Promise<boolean | UrlTree>
        | boolean
        | UrlTree {
        const isLoggedIn = this.authService.getSessionID() !== null
        if (!isLoggedIn) {
            //todo fix reload delay
            const auth = this.authService.onUpdateCredentials$.pipe(
                delay(300),
                map(() => {
                    return true
                })
            )
            this.mainService.authenticate().subscribe()
            return auth

            //this.router.navigate(['/'], {queryParams: {forceAuth: true}})
        }
        return of(isLoggedIn)
    }
}
