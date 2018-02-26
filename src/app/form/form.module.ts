import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { SharedModule } from '@app/shared';

import { FormRoutingModule } from './form-routing.module';
import { FormComponent } from './form/form.component';
import { StandardComponent } from './standard/standard.component';

@NgModule({
  imports: [
    SharedModule,
    FormRoutingModule,
    // StoreModule.forFeature('examples', {
    //   todos: todosReducer,
    //   stocks: stockMarketReducer
    // }),
    // EffectsModule.forFeature([TodosEffects, StockMarketEffects])
  ],
  declarations: [
    FormComponent,
    StandardComponent
  ],
  providers: []
})
export class FormModule {
  constructor() {}
}
