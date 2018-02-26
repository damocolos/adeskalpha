import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CreditRoutingModule } from './credit-routing.module';
import { CreditComponent } from './credit.component';
import { SharedModule } from '@app/shared';
import { SCreditComponent } from './s-credit/s-credit.component';

@NgModule({
  imports: [
    CommonModule,
    CreditRoutingModule,
    SharedModule
  ],
  declarations: [CreditComponent, SCreditComponent],
  entryComponents: [SCreditComponent]
})
export class CreditModule { }
