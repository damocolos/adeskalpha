import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// import { SettingsComponent } from '../settings';
import { PageComponent } from './page.component';
// import { AuthGuard } from '@app/core/auth-guard/auth.guard';

const routes: Routes = [
    {
        path: '',
        component: PageComponent,
        children: [
            {
                path: '',
                redirectTo: 'member',
                pathMatch: 'full'
            },
            // {
            //     path: 'settings',
            //     component: SettingsComponent,
            //     data: {
            //         title: 'Settings'
            //     }
            // },
            // {
            //     path: 'examples',
            //     loadChildren: 'app/examples/examples.module#ExamplesModule'
            // },
            // {
            //     path: 'form',
            //     loadChildren: 'app/form/form.module#FormModule'
            // },
            {
                path: 'member',
                loadChildren: 'app/member/member.module#MemberModule',
                data: {
                    title: 'Member'
                }
            },
            {
                path: 'deposit',
                loadChildren: 'app/deposit/deposit.module#DepositModule',
                data: {
                    title: 'Deposit'
                }
            },
            {
                path: 'credit',
                loadChildren: 'app/credit/credit.module#CreditModule',
                data: {
                    title: 'Credit'
                }
            },
            {
                path: 'bookkeeping',
                loadChildren: 'app/bookkeeping/bookkeeping.module#BookkeepingModule',
                data: {
                    title: 'Book Keeping'
                }
            },


            {
                path: 'insurance',
                loadChildren: 'app/insurance/insurance.module#InsuranceModule',
                data: {
                    title: 'Insurance'
                }
            },
            {
                path: 'media',
                loadChildren: 'app/media/media.module#MediaModule',
                data: {
                    title: 'Media'
                }
            },
            {
                path: 'user',
                loadChildren: 'app/user/user.module#UserModule'
            },
            // {
            //     path: '**',
            //     redirectTo: 'member'
            // }
        ]
    }
];

@NgModule({
    // useHash supports github.io demo page, remove in your app
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class PageRoutingModule { }
