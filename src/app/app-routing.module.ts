import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SettingsComponent } from './settings';
import { AuthGuard } from '@app/core/auth-guard/auth.guard';

const routes: Routes = [
    {
        path: '',
        redirectTo: 'page',
        pathMatch: 'full',
    },
    {
        path: 'page',
        loadChildren: 'app/page/page.module#PageModule',
        // canActivate: [ AuthGuard ],
    },
    {
        path: 'auth',
        loadChildren: 'app/auth/auth.module#AuthModule',
        data: {
            title: 'Auth'
        }
    }
    //   {
    //     path: 'settings',
    //     component: SettingsComponent,
    //     data: {
    //       title: 'Settings'
    //     }
    //   },
    //   {
    //     path: 'examples',
    //     loadChildren: 'app/examples/examples.module#ExamplesModule'
    //   },
    //   {
    //       path: 'form',
    //       loadChildren: 'app/form/form.module#FormModule'
    //   },
    //   {
    //     path: '**',
    //     redirectTo: 'about'
    //   }
];

@NgModule({
    // useHash supports github.io demo page, remove in your app
    imports: [RouterModule.forRoot(routes, { useHash: true })],
    exports: [RouterModule]
})
export class AppRoutingModule { }
