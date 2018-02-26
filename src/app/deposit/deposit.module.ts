import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DepositRoutingModule } from './deposit-routing.module';
import { DepositComponent } from './deposit.component';
import { SharedModule } from '@app/shared';
import { SDepositComponent } from './s-deposit/s-deposit.component';

@NgModule({
  imports: [
    CommonModule,
    DepositRoutingModule,
    SharedModule
  ],
  declarations: [DepositComponent, SDepositComponent],
  entryComponents: [SDepositComponent]
})
export class DepositModule { }
