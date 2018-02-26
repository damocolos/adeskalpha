import { Title } from '@angular/platform-browser';
import { OverlayContainer } from '@angular/cdk/overlay';
import { Component, HostBinding, OnDestroy, OnInit } from '@angular/core';
import { ActivationEnd, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Subject } from 'rxjs/Subject';
import { takeUntil } from 'rxjs/operators/takeUntil';
import { map } from 'rxjs/operators/map';
import { filter } from 'rxjs/operators/filter';

// login, logout, selectorAuth, 
import { routerTransition } from '@app/core';
import { environment } from '@env/environment';

import { selectorSettings } from './settings';

import { TranslateService } from '@ngx-translate/core';
import { LoaderService } from '@app/loader.service';
import { selectorUsers, actionInitUser } from '@app/core/user/user.reducer';
import { UserDataService } from '@app/core/user/user-data.service';
import { selectorMedias, actionInitMedia } from '@app/media/media.reducer';
import { MediaDataService } from '@app/media/media-data.service';
import { actionInitInsurance } from '@app/insurance/insurance.reducer';
import { InsuranceDataService } from '@app/insurance/insurance-data.service';
import { TreadService } from '@app/core/tread/tread.service';

@Component({
    selector: 'anms-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
    animations: [routerTransition]
})
export class AppComponent implements OnInit, OnDestroy {
    private unsubscribe$: Subject<void> = new Subject<void>();

    showLoader: boolean;
    itsDone: number = 0;

    @HostBinding('class') componentCssClass;

    //   isProd = env.production;
    //   envName = env.envName;
    //   version = env.versions.app;
    //   year = new Date().getFullYear();
    //   logo = require('../assets/logo.png');
    //   navigation = [
    //     { link: 'about', label: 'About' },
    //     { link: 'features', label: 'Features' },
    //     { link: 'examples', label: 'Examples' },
    //     { link: 'form', label: 'Form' }
    //   ];
    //   navigationSideMenu = [
    //     ...this.navigation,
    //     { link: 'settings', label: 'Settings' }
    //   ];
    //   isAuthenticated;

    constructor(
        public overlayContainer: OverlayContainer,
        private store: Store<any>,
        private userService: UserDataService,
        private treadService: TreadService,
        private router: Router,
        private titleService: Title,
        private loaderService: LoaderService,
        private translate: TranslateService
    ) {
        if (!environment.production)
            console.log('env', environment);

        // this language will be used as a fallback when a translation isn't found in the current language
        translate.setDefaultLang('en');

        // the lang to use, if the lang isn't available, it will use the current loader to get them
        translate.use('en');
    }

    ngOnInit(): void {
        // this.store
        //     .select(selectorSettings)
        //     .pipe(
        //         takeUntil(this.unsubscribe$),
        //         map(({ theme }) => theme.toLowerCase())
        //     )
        //     .subscribe(theme => {
        //         this.componentCssClass = theme;
        //         this.overlayContainer.getContainerElement().classList.add(theme);
        //     });
        this.componentCssClass = 'default-theme';
        this.overlayContainer.getContainerElement().classList.add('default-theme');
        // this.store
        //   .select(selectorAuth)
        //   .pipe(takeUntil(this.unsubscribe$))
        //   .subscribe(auth => (this.isAuthenticated = auth.isAuthenticated));
        this.router.events
            .pipe(filter(event => event instanceof ActivationEnd))
            .subscribe((event: ActivationEnd) => {
                // this.showLoader = true;
                let lastChild = event.snapshot;
                while (lastChild.children.length) {
                    lastChild = lastChild.children[0];
                }
                const { title } = lastChild.data;
                this.titleService.setTitle(
                    title ? `${title} | ${environment.appName}` : environment.appName
                );
            });

        //   service loader
        this.loaderService.status
            .subscribe((val: boolean) => {
                setTimeout(() => this.showLoader = val, 0);
            });

        // show loader
        // this.loaderService.display(true);

        // this.store
        //     .select(selectorMedias)
        //     .pipe(takeUntil(this.unsubscribe$))
        //     .subscribe(
        //         result => {
        //             if (!environment.production)
        //                 console.log("media subscribe", result);
        //         });


        // this.store
        //     .select(selectorUsers)
        //     .pipe(takeUntil(this.unsubscribe$))
        //     .subscribe(
        //         result => {
        //             if (!environment.production)
        //                 console.log("user subscribe", result);
        //         });

        // this.userService.getAll()
        //     .subscribe(
        //         result => {
        //             if (!environment.production)
        //                 console.log("user data", result);

        //             this.store.dispatch(actionInitUser(result.data));
        //         });

        this.treadService.run();

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
    }
}
