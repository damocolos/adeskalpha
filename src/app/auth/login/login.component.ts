import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
// import { Http, Headers } from '@angular/http';
import { HttpClient } from '@angular/common/http';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { takeUntil } from 'rxjs/operators/takeUntil';
import { environment } from '@env/environment';
import { Store } from '@ngrx/store';
import { selectorAuth, login } from '@app/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs/Subject';
import { LoaderService } from '@app/loader.service';
import { MatSnackBar } from '@angular/material';
import { TreadService } from '@app/core/tread/tread.service';
// import * as Crypt from 'crypto-js';

@Component({
    selector: 'anms-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

    loginForm: FormGroup;
    private unsubscribe$: Subject<void> = new Subject<void>();

    constructor(
        private loader: LoaderService,
        public snackBar: MatSnackBar,
        private router: Router,
        private treadService: TreadService,
        private store: Store<any>,
        private http: HttpClient,
        private fb: FormBuilder) {
        this.createForm();

        this.store.select(selectorAuth);
    }

    ngOnInit() {}

    createForm() {
        this.loginForm = this.fb.group({
            'email': ['', [Validators.required, Validators.email]],
            'password': ['', Validators.required]
        });

        // if (!environment.production) {
        //     this.loginForm.patchValue({
        //         email: 'umam.work@gmail.com',
        //         password: 'super_admin'
        //     });
        // }
    }

    checkConnection() {
    }

    login() {
        // console.log(this.loginForm.value);
        if (this.loginForm.valid) {
            this.loader.display(true);
            this.http.post(`${environment.app.endpoint}/login`, this.loginForm.value)
                .pipe(takeUntil(this.unsubscribe$))
                .subscribe(
                result => {
                    const token: string = (<any>result).data.token;
                    if (!environment.production)
                        console.log("login result", token);

                    // encrypt token for local storage
                    // const encrypted = Crypt.AES.encrypt((<any>result).data.token, environment.app.SECRET_KEY).toString();
                    // if (!environment.production)
                    //     console.log("cipher", encrypted);

                    // remove loader
                    this.loader.display(false);

                    
                    // set token as local storage
                    localStorage.setItem('token', token);
                    this.store.dispatch(login(token));

                    // run tread
                    this.treadService.run();

                    // go page
                    this.router.navigate(['/page']);
                }, err => {
                    if(err.status == 500) {
                        let snackBarRef = this.snackBar.open(err.error.err, null, {
                            duration: 3000
                        });
                    }
                });
        }
    }

    fakeLogin() {
        this.router.navigate(['/page']);
    }

}
