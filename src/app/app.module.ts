import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';

import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { HttpClientModule, HttpClient } from '@angular/common/http';

import { SharedModule } from '@app/shared';
import { CoreModule } from '@app/core';

import { SettingsModule } from './settings';
import { StaticModule } from './static';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
// import { HttpInterceptService } from '@app/core/http-intercept/http-intercept.service';

import {TranslateModule, TranslateLoader} from '@ngx-translate/core';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';
import { LoaderService } from '@app/loader.service';

// AoT requires an exported function for factories
// export function HttpLoaderFactory(http: HttpClient) {
//     return new TranslateHttpLoader(http);
// }

// AoT requires an exported function for factories
export function HttpLoaderFactory(http: HttpClient) {
    return new TranslateHttpLoader(http, './assets/i18n/', '.json');
  }

@NgModule({
  imports: [
    // angular
    BrowserAnimationsModule,
    BrowserModule,

    // form
    FormsModule,
    ReactiveFormsModule,

    // http
    HttpModule,
    HttpClientModule,

    // core & shared
    CoreModule.forRoot(),
    SharedModule,

    // features
    StaticModule,
    // SettingsModule,

    // internationalize
    TranslateModule.forRoot({
        loader: {
            provide: TranslateLoader,
            useFactory: HttpLoaderFactory,
            deps: [HttpClient]
        }
    }),

    // app
    AppRoutingModule
  ],
  declarations: [AppComponent],
  providers: [
    // {
    //     provide: HTTP_INTERCEPTORS,
    //     useClass: HttpInterceptService,
    //     multi: true,
    // }
    LoaderService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
