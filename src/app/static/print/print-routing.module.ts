import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PrintComponent } from '@app/static/print/print.component';
import { PrintBookkeepingComponent } from '@app/static/print/print-bookkeeping/print-bookkeeping.component';

const routes: Routes = [
    {
        path: '',
        component: PrintComponent,
        children: [
            {
                path: '',
                redirectTo: 'bookkeeping',
                pathMatch: 'full'
            },
            {
                path: 'bookkeeping',
                component: PrintBookkeepingComponent,
                data: {
                    title: 'Print Book Keeping'
                }
            }
        ]
    }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PrintRoutingModule { }
