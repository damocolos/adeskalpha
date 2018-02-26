import { Title } from '@angular/platform-browser';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivationEnd, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Subject } from 'rxjs/Subject';
import { takeUntil } from 'rxjs/operators/takeUntil';
import { map } from 'rxjs/operators/map';
import { filter } from 'rxjs/operators/filter';

import { login, logout, selectorAuth, routerTransition } from '../../app/core';
import { environment as env, environment } from '../../environments/environment';

// import * as CryptoJS from 'crypto-js';

// import { selectorSettings } from './settings';

@Component({
    selector: 'anms-page',
    templateUrl: './page.component.html',
    styleUrls: ['./page.component.scss'],
    animations: [routerTransition]
})

export class PageComponent implements OnInit, OnDestroy {

    private unsubscribe$: Subject<void> = new Subject<void>();

    isProd = env.production;
    envName = env.envName;
    appName = env.appName;
    version = env.versions.app;
    year = new Date().getFullYear();
    logo = 'assets/logo_reversed.png';
    navigation = [
        // { link: 'about', label: 'About' },
        // { link: 'features', label: 'Features' },
        // { link: 'examples', label: 'Examples' },
        // { link: 'form', label: 'Form' },
        { link: 'member', label: 'menu.member', icon: 'people' },
        { link: 'deposit', label: 'menu.deposit', icon: 'attach_money' },
        { link: 'credit', label: 'menu.credit', icon: 'shopping_cart' },
        { link: 'bookkeeping', label: 'menu.bookkeeping', icon: 'book' },
        // { link: 'insurance', label: 'Insurance' },
        // { link: 'user', label: 'User' },
        // { link: 'media', label: 'Media' },
        // { link: 'auth', label: 'Login' }
    ];
    navigationSideMenu = [
        ...this.navigation,
        // { link: 'settings', label: 'Settings' }
    ];
    isAuthenticated;
    title;

    constructor(
        private store: Store<any>,
        private router: Router,
        private titleService: Title
    ) {
        this.store
            .select(selectorAuth)
            .pipe(takeUntil(this.unsubscribe$))
            .subscribe(auth => (this.isAuthenticated = auth.isAuthenticated));

        this.router.events
            .pipe(filter(event => event instanceof ActivationEnd))
            .subscribe((event: ActivationEnd) => {
                let lastChild = event.snapshot;
                while (lastChild.children.length) {
                    lastChild = lastChild.children[0];
                }
                const { title } = lastChild.data;
                this.title = title;
            });
    }

    ngOnInit(): void {

    }

    ngOnDestroy(): void {
        this.unsubscribe$.next();
        this.unsubscribe$.complete();
    }

    onLoginClick() {
        // this.store.dispatch(login());
    }

    onLogoutClick() {
        // this.store.dispatch(logout());
        localStorage.setItem('token', '');
        this.router.navigate([environment.app.LOGIN_PAGE]);
    }
}
