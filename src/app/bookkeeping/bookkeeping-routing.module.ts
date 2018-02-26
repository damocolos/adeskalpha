import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BookkeepingComponent } from '@app/bookkeeping/bookkeeping.component';

const routes: Routes = [
    {
        path: '',
        component: BookkeepingComponent
    }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BookkeepingRoutingModule { }
