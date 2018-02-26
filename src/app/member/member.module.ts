import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '@app/shared';
import { MemberComponent } from '@app/member/member.component';
import { MemberRoutingModule } from '@app/member/member-routing.module';
import { SMemberComponent } from './s-member/s-member.component';
import { NgxChartsModule } from '@swimlane/ngx-charts';

@NgModule({
    imports: [
        CommonModule,
        MemberRoutingModule,
        SharedModule,
        NgxChartsModule,
    ],
    declarations: [MemberComponent, SMemberComponent],
    entryComponents: [SMemberComponent]
})
export class MemberModule { }
