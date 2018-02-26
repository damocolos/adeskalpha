import { Component, OnInit, Inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { IMember, selectorMembers } from '@app/member/member.reducer';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';

@Component({
    selector: 'anms-show-member',
    templateUrl: './show-member.component.html',
    styleUrls: ['./show-member.component.scss']
})
export class ShowMemberComponent implements OnInit {

    member: IMember;

    constructor(
        public store: Store<IMember>,
        public dialogRef: MatDialogRef<any>,
        @Inject(MAT_DIALOG_DATA) public data: any
    ) {
        this.store
            .select(selectorMembers)
            .subscribe(result => {
                this.getMember(result);
            });
    }

    ngOnInit() { }

    getMember(members: IMember[]) {
        this.member = members.filter( member => member.nik === this.data._id )[0];
    }

}
