import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';

import { } from 'googlemaps';
import { AgmCoreModule } from '@agm/core';

import { InsuranceRoutingModule } from './insurance-routing.module';
import { InsuranceComponent } from './insurance/insurance.component';
import { AllInsuranceComponent } from './all-insurance/all-insurance.component';
import { InsuranceDataService } from './insurance-data.service';
import { SharedModule } from '@app/shared';
import { SingleInsuranceComponent } from './single-insurance/single-insurance.component';
import { insuranceReducer } from '@app/insurance/insurance.reducer';
import { environment } from '@env/environment';
import { LocPickerComponent } from './loc-picker/loc-picker.component';


@NgModule({
    imports: [
        CommonModule,
        InsuranceRoutingModule,

        // StoreModule.forFeature('insurance',
        //     { insurances: insuranceReducer }
        // ),
        !environment.production ?
            StoreDevtoolsModule.instrument({
                maxAge: 25 // Retains last 25 states
            })
            : [],

        // map
        AgmCoreModule.forRoot({
            apiKey: environment.app.GMAPS_KEY,
            libraries: ["places"]
        }),

        SharedModule
    ],
    entryComponents: [
        LocPickerComponent,
        SingleInsuranceComponent,
    ],
    declarations: [InsuranceComponent, AllInsuranceComponent, SingleInsuranceComponent, LocPickerComponent],
    providers: [InsuranceDataService]
})
export class InsuranceModule { }
