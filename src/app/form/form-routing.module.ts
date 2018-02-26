import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FormComponent } from './form/form.component';
import { StandardComponent } from './standard/standard.component';

const routes: Routes = [
  {
    path: '',
    component: FormComponent,
    children: [
      {
        path: '',
        redirectTo: 'standard',
        pathMatch: 'full'
      },
      {
        path: 'standard',
        component: StandardComponent,
        data: {
          title: 'Standard'
        }
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FormRoutingModule {}
