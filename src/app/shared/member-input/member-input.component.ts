import { Component, OnInit, Inject, ViewChild } from '@angular/core';
import { Store } from '@ngrx/store';
import { IMember, selectorMembers } from '@app/member/member.reducer';
import { MatDialogRef, MAT_DIALOG_DATA, MatTableDataSource, MatPaginator } from '@angular/material';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operator/takeUntil';

@Component({
    selector: 'anms-member-input',
    templateUrl: './member-input.component.html',
    styleUrls: ['./member-input.component.scss']
})
export class MemberInputComponent implements OnInit {

    members: any[] = [];
    selected: IMember = null;

    displayedColumns = ['nik', 'name', 'email', 'date', 'action'];
    dataSource = new MatTableDataSource();
    @ViewChild(MatPaginator) paginator: MatPaginator;

    private unsubscribe$: Subject<void> = new Subject<void>();

    constructor(
        public store: Store<IMember>,
        public dialogRef: MatDialogRef<any>,
        @Inject(MAT_DIALOG_DATA) public data: any
    ) {
        this.store
            .select(selectorMembers)
            .subscribe(
                result => {
                    this.dataSource.data = result;
                    this.members = result;
                    this.selected = result[0];
                });
    }

    ngOnInit() {
    }

    applyFilter(filterValue: string) {
        filterValue = filterValue.trim(); // Remove whitespace
        filterValue = filterValue.toLowerCase(); // MatTableDataSource defaults to lowercase matches
        this.dataSource.filter = filterValue;
        this.members = this.dataSource.filteredData;
        if(this.members) {
            this.selected = this.members[0];
        }
    }

    onSelect(member: IMember) {
        this.selected = member;
    }

}
