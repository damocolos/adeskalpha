import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest } from '@angular/common/http';
// import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/do';
import { Observable } from 'rxjs/Observable';
import { environment } from '@env/environment';
import { Store } from '@ngrx/store';
import { selectorAuth, logout } from '@app/core';
import { Router } from '@angular/router';
import { takeUntil } from 'rxjs/operator/takeUntil';
import { LoaderService } from '@app/loader.service';
// import * as Crypt from 'crypto-js';
import {MatSnackBar} from '@angular/material';

@Injectable()
export class HttpInterceptService implements HttpInterceptor {

    // initiate
    private token: string = '';

    constructor (
        private router: Router, 
        private loader: LoaderService,
        public snackBar: MatSnackBar) {}

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        // encrypt
        // if(localStorage.getItem('token')) {
        //     const encrypted = localStorage.getItem('token');
        //     const decrypted = Crypt.AES.decrypt(encrypted, environment.app.SECRET_KEY).toString(Crypt.enc.Utf8);
        //     this.token = decrypted;
        // }

        if(localStorage.getItem('token'))
            this.token = localStorage.getItem('token');

        if(!environment.production)
            console.log("interceptor token bottom", this.token);

        const authReq = req.clone({
            headers: req.headers.set('Authorization', `Bearer ${this.token}`),
            // headers: req.headers.set('Content-Type', 'application/json')
        });

        if (!environment.production)
            console.log("intercept", req);

        return next
        .handle(authReq)
        .do(
            success =>  {
                if (!environment.production)
                    console.log("intercept success", success);
            },
            err => {
                
                this.loader.display(false);

                if (!environment.production)
                    console.log("intercept error", err);

                // handle if expired
                if (err.status == 401 || err.error.code == 401)
                    this.router.navigate([environment.app.LOGIN_PAGE]);

                if (err.status == 0) {
                    let snackBarRef = this.snackBar.open('offline - check your connection and refresh the page ', 'close', {
                        duration: 10000
                    });
                }
            }
        );
    }
}