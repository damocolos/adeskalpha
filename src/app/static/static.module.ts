import { NgModule } from '@angular/core';

import { SharedModule } from '@app/shared';

import { StaticRoutingModule } from './static-routing.module';
import { AboutComponent } from './about/about.component';
import { FeaturesComponent } from './features/features.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { StoreModule } from '@ngrx/store/src/store_module';
import { authReducer, getInitialState, CoreModule } from '@app/core';
import { PrintComponent } from '@app/static/print/print.component';

@NgModule({
    imports: [
        SharedModule,
        StaticRoutingModule,
        ReactiveFormsModule,
        FormsModule,
        // CoreModule,
    ],
    declarations: [AboutComponent, FeaturesComponent]
})
export class StaticModule { }
