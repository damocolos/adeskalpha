import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PrintRoutingModule } from './print-routing.module';
import { PrintComponent } from './print.component';
import { PrintBookkeepingComponent } from './print-bookkeeping/print-bookkeeping.component';
import { SharedModule } from '@app/shared';

@NgModule({
  imports: [
    CommonModule,
    PrintRoutingModule,
    SharedModule
  ],
  declarations: [PrintComponent, PrintBookkeepingComponent],
  bootstrap: [PrintComponent]
})
export class PrintModule { }
