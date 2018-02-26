import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NgxChartsModule } from '@swimlane/ngx-charts';
// import { PdfmakeModule } from 'ng-pdf-make';

import { BookkeepingRoutingModule } from './bookkeeping-routing.module';
import { BookkeepingComponent } from './bookkeeping.component';
import { SharedModule } from '@app/shared';
import { WindowRef } from '@app/bookkeeping/winref.service';
import { SBookkeepingComponent } from './s-bookkeeping/s-bookkeeping.component';

@NgModule({
  imports: [
    NgxChartsModule,
    CommonModule,
    BookkeepingRoutingModule,
    SharedModule
  ],
  declarations: [ BookkeepingComponent, SBookkeepingComponent ],
  entryComponents: [SBookkeepingComponent],
  providers: [ WindowRef ]
})
export class BookkeepingModule { }
