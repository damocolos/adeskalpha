import { CommonModule } from '@angular/common';
// import { BrowserModule } from '@angular/platform-browser';
// import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';

import { SharedModule } from '../../app/shared';
import { CoreModule } from '../../app/core';

import { SettingsModule } from '../settings';
import { StaticModule } from '../static';

import { PageRoutingModule } from './page.routing';
import { PageComponent } from './page.component';

@NgModule({
  imports: [
    // angular
    // BrowserAnimationsModule,
    // CommonModule,
    // NoopAnimationsModule,
    // core & shared
    // CoreModule,
    SharedModule,

    // features
    StaticModule,
    SettingsModule,

    // app
    PageRoutingModule
  ],
  declarations: [PageComponent],
  providers: [],
  bootstrap: [PageComponent]
})
export class PageModule {}
