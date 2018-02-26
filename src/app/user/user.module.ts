import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserRoutingModule } from './user-routing.module';
import { UserComponent } from './user/user.component';
import { AllUserComponent } from './all-user/all-user.component';
import { SingleUserComponent } from './single-user/single-user.component';
import { SharedModule } from '@app/shared';
import { UserDataService } from '@app/user/user-data.service';
import { StoreModule } from '@ngrx/store';
import { userReducer } from '@app/user/user.reducer';

@NgModule({
    imports: [
        CommonModule,
        UserRoutingModule,

        StoreModule.forFeature('user',
            { users: userReducer }
        ),

        SharedModule
    ],
    declarations: [UserComponent, AllUserComponent, SingleUserComponent],
    entryComponents: [SingleUserComponent],
    providers: [UserDataService]
})
export class UserModule { }
