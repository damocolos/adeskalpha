import { Component, OnInit, ViewChild } from '@angular/core';
import { Store } from '@ngrx/store';
import { environment } from '@env/environment';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators/takeUntil';
import { MatTableDataSource, MatPaginator, MatDialog } from '@angular/material';
import { IDeposit, selectorDeposits } from '@app/deposit/deposit.reducer';
import { IMember, selectorMembers } from '@app/member/member.reducer';
import { DialogService } from '@app/shared/services/dialog.service';
import { SDepositComponent } from '@app/deposit/s-deposit/s-deposit.component';
import { LoaderService } from '@app/loader.service';

@Component({
    selector: 'anms-deposit',
    templateUrl: './deposit.component.html',
    styleUrls: ['./deposit.component.scss']
})
export class DepositComponent implements OnInit {

    displayedColumns = ['type', 'amount', 'member', 'date', 'action'];
    dataSource = new MatTableDataSource();
    @ViewChild(MatPaginator) paginator: MatPaginator;

    public members: IMember[];

    private unsubscribe$: Subject<void> = new Subject<void>();

    constructor(
        public store: Store<IDeposit[]>,
        public loader: LoaderService,
        public _dialog: DialogService,
        public dialog: MatDialog
    ) {
        this.store
            .select(selectorDeposits)
            .pipe(takeUntil(this.unsubscribe$))
            .subscribe(
                result => {
                    this.dataSource.data = result;
                    if (!environment.production)
                        console.log("subscribe", result);
                    // this.store.dispatch(actionPersistInsurance(this.dataInsurances));
                });

        this.store
            .select(selectorMembers)
            .pipe(takeUntil(this.unsubscribe$))
            .subscribe(
                result => {
                    this.members = result;
                    if (!environment.production)
                        console.log("subscribe", result);
                    // this.store.dispatch(actionPersistInsurance(this.dataInsurances));
                });

    }

    ngOnInit() {
        this.loader.display(false);
    }

    ngAfterViewInit() {
        this.dataSource.paginator = this.paginator;
    }

    applyFilter(filterValue: string) {
        filterValue = filterValue.trim(); // Remove whitespace
        filterValue = filterValue.toLowerCase(); // MatTableDataSource defaults to lowercase matches
        this.dataSource.filter = filterValue;
    }

    getMember(nik: string) {
        return this.members.filter(data => data.nik === nik )[0];
    }

    openMember(_id: any) {
        this._dialog.openMember(_id);
    }

    runDialog(object: IDeposit = null) {
        let dialogRef = this.dialog.open(SDepositComponent, {
            width: '500px',
            height: '600px',
            data: object
        });

        dialogRef.afterClosed().subscribe(result => {
            // check result
            if (result) {
                if (result.status == 'create' || result.status == 'delete') {
                    //
                    // paginator update
                    this.dataSource.paginator = this.paginator;
                }
            }
        });
    }

}
