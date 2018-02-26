import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AboutComponent } from './about/about.component';
import { FeaturesComponent } from './features/features.component';
import { PrintComponent } from '@app/static/print/print.component';

const routes: Routes = [
    {
        path: 'about',
        component: AboutComponent,
        data: { title: 'About' }
    },
    {
        path: 'features',
        component: FeaturesComponent,
        data: { title: 'Features' }
    },
    {
        path: 'print',
        // component: PrintComponent,
        loadChildren: 'app/static/print/print.module#PrintModule',
        // data: {
        //     title: 'Print'
        // }
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class StaticRoutingModule { }
