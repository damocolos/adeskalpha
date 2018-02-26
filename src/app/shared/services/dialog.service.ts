import { Injectable } from '@angular/core';
import { environment } from '@env/environment';
import { Store } from '@ngrx/store';
import { LoaderService } from '@app/loader.service';
import { MatDialog } from '@angular/material';
import { ShowMemberComponent } from '@app/shared/show-member/show-member.component';

@Injectable()
export class DialogService {
    constructor(
        private loader: LoaderService,
        private store: Store<any>,
        public dialog: MatDialog
    ) {

    }

    public openMember(_id: any) {
        let dialogRef = this.dialog.open(ShowMemberComponent, {
            width: '900px',
            height: '600px',
            data: {
                _id: _id
            }
        });

        dialogRef.afterClosed().subscribe(result => {
            console.log('dialog close', result);
        });
    }
}
