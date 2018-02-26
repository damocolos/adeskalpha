import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MediaComponent } from '@app/media/media/media.component';
import { AllMediaComponent } from '@app/media/all-media/all-media.component';

const routes: Routes = [
    {
        path: '',
        component: MediaComponent,
        children: [
            {
                path: '',
                redirectTo: 'all',
                pathMatch: 'full'
            },
            {
                path: 'all',
                component: AllMediaComponent,
                data: {
                    title: 'Media'
                }
            }
        ]
    }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MediaRoutingModule { }
