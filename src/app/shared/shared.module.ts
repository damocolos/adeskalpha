import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatDialogModule } from '@angular/material/dialog';
import { MatMenuModule } from '@angular/material/menu';
import { MatSelectModule } from '@angular/material/select';
import { MatTabsModule } from '@angular/material/tabs';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatChipsModule } from '@angular/material/chips';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatCardModule } from '@angular/material/card';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule, MatNativeDateModule } from '@angular/material';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatSortModule } from '@angular/material/sort';

import { CdkTableModule } from '@angular/cdk/table';

// add
import { MatSnackBarModule } from '@angular/material/snack-bar';

import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { BigInputComponent } from './big-input/big-input.component';
import { BigInputActionComponent } from './big-input/big-input-action.component';
import { AlertDialogComponent } from './alert-dialog/alert-dialog.component';
import { FileInputComponent } from './file-input/file-input.component';

import { TranslateModule } from '@ngx-translate/core';
import { ShowMemberComponent } from './show-member/show-member.component';
import { DialogService } from '@app/shared/services/dialog.service';
import { MemberInputComponent } from './member-input/member-input.component';

@NgModule({
    imports: [
        CommonModule,
        ReactiveFormsModule, FormsModule,

        MatButtonModule,
        MatDialogModule,
        MatToolbarModule,
        MatSelectModule,
        MatTabsModule,
        MatFormFieldModule,
        MatInputModule,
        MatProgressSpinnerModule,
        MatChipsModule,
        MatCardModule,
        MatSidenavModule,
        MatCheckboxModule,
        MatListModule,
        MatMenuModule,
        MatIconModule,
        MatTooltipModule,
        MatSnackBarModule,
        MatTableModule,
        MatPaginatorModule,
        MatProgressBarModule,
        MatGridListModule,
        MatDatepickerModule,
        MatNativeDateModule,
        MatSortModule,

        CdkTableModule,

        TranslateModule,
    ],
    entryComponents: [
        AlertDialogComponent,
        ShowMemberComponent,
        MemberInputComponent,
    ],
    declarations: [
        BigInputComponent,
        BigInputActionComponent,
        AlertDialogComponent,
        FileInputComponent,
        ShowMemberComponent,
        MemberInputComponent
    ],
    exports: [
        CommonModule,
        ReactiveFormsModule, FormsModule,

        MatButtonModule,
        MatDialogModule,
        MatMenuModule,
        MatTabsModule,
        MatChipsModule,
        MatFormFieldModule,
        MatInputModule,
        MatProgressSpinnerModule,
        MatCheckboxModule,
        MatCardModule,
        MatSidenavModule,
        MatListModule,
        MatSelectModule,
        MatToolbarModule,
        MatIconModule,
        MatTooltipModule,
        MatSnackBarModule,
        MatTableModule,
        MatPaginatorModule,
        MatProgressBarModule,
        MatGridListModule,
        MatDatepickerModule,
        MatSortModule,

        CdkTableModule,

        BigInputComponent,
        BigInputActionComponent,
        FileInputComponent,
        MemberInputComponent,

        TranslateModule,
    ],
    providers: [
        DialogService
    ]
})
export class SharedModule { }
