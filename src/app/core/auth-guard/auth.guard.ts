import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { Router } from '@angular/router';
import { environment } from '@env/environment';

@Injectable()
export class AuthGuard implements CanActivate {

    constructor(private router: Router) {

    }

    canActivate(
        next: ActivatedRouteSnapshot,
        state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {

        if(!environment.production)
            console.log('auth guard', localStorage.getItem('token'));

        if(!localStorage.getItem('token') || localStorage.getItem('token') == '') {
            this.router.navigate([environment.app.LOGIN_PAGE]);
            return false;
        }

        return true;
    }
}
