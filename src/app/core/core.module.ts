import { NgModule, Optional, SkipSelf } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { LocalStorageService } from './local-storage/local-storage.service';
import { authReducer } from './auth/auth.reducer';
import { AuthEffects } from './auth/auth.effects';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { HttpInterceptService } from './http-intercept/http-intercept.service';
import { AuthGuard } from '@app/core/auth-guard/auth.guard';
import { userReducer } from '@app/core/user/user.reducer';
import { UserDataService } from '@app/core/user/user-data.service';
import { mediaReducer } from '@app/media/media.reducer';
import { MediaDataService } from '@app/media/media-data.service';
import { InsuranceDataService } from '@app/insurance/insurance-data.service';
import { insuranceReducer } from '@app/insurance/insurance.reducer';
import { TreadService } from '@app/core/tread/tread.service';
import { memberReducer } from '@app/member/member.reducer';
import { depositReducer } from '@app/deposit/deposit.reducer';
import { creditReducer } from '@app/credit/credit.reducer';
import { bookkeepingReducer } from '@app/bookkeeping/bookkeeping.reducer';
import { printReducer } from '@app/static/print/print.reducer';

export function getInitialState() {
    return LocalStorageService.loadInitialState();
}

@NgModule({
    imports: [
        // angular
        CommonModule,
        HttpClientModule,

        // ngrx
        StoreModule.forRoot(
            {
                auth: authReducer,
                insurance: insuranceReducer,
                user: userReducer,
                media: mediaReducer,
                member: memberReducer,
                deposit: depositReducer,
                credit: creditReducer,
                bookkeeping: bookkeepingReducer,
                print: printReducer,
            },
            { initialState: getInitialState }
        ),
        EffectsModule.forRoot([AuthEffects])
    ],
    declarations: [],
    providers: [
        LocalStorageService, 
        {
            provide: HTTP_INTERCEPTORS,
            useClass: HttpInterceptService,
            multi: true,
        },
        AuthGuard,
        UserDataService,
        MediaDataService,
        InsuranceDataService,

        TreadService,
    ]
})
export class CoreModule {
    constructor(
        @Optional()
        @SkipSelf()
        parentModule: CoreModule
    ) {
        if (parentModule) {
            throw new Error('CoreModule is already loaded. Import only in AppModule');
        }
    }

    static forRoot() {
        return {
            ngModule: CoreModule,
            providers: [
                UserDataService,
                MediaDataService,
                InsuranceDataService,
                TreadService,
            ]
        }
    }
}
