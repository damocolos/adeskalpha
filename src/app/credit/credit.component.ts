import { Component, OnInit, ViewChild } from '@angular/core';
import { Store } from '@ngrx/store';
import { environment } from '@env/environment';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators/takeUntil';
import { MatTableDataSource, MatPaginator, MatDialog, MatSort } from '@angular/material';
import { IMember, selectorMembers } from '@app/member/member.reducer';
import { ICredit, selectorCredits } from '@app/credit/credit.reducer';
import { DialogService } from '@app/shared/services/dialog.service';
import { SCreditComponent } from '@app/credit/s-credit/s-credit.component';
import { LoaderService } from '@app/loader.service';

@Component({
    selector: 'anms-credit',
    templateUrl: './credit.component.html',
    styleUrls: ['./credit.component.scss']
})
export class CreditComponent implements OnInit {

    displayedColumns = [
        'status',
        'type',
        'member',
        'amount',
        'paid',
        'interest',
        'monthly',
        'date',
        'action'
    ];
    dataSource = new MatTableDataSource();
    @ViewChild(MatPaginator) paginator: MatPaginator;
    @ViewChild(MatSort) sort: MatSort;

    public members: IMember[];
    public credits: ICredit[];

    private unsubscribe$: Subject<void> = new Subject<void>();

    option: any = {
        from_date: null,
        to_date: null
    }

    constructor(
        public store: Store<ICredit[]>,
        public loader: LoaderService,
        public _dialog: DialogService,
        public dialog: MatDialog,
    ) {
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

        this.store
            .select(selectorCredits)
            .pipe(takeUntil(this.unsubscribe$))
            .subscribe(
                result => {
                    let c = [];
                    result.forEach(element => {
                        element.member = this.getMember(element.nik).name;
                        element.status = (this.done(element)) ? 'done' : 'progress';
                    });
                    this.dataSource.data = result;
                    this.credits = result;
                    if (!environment.production)
                        console.log("subscribe", result);
                    // this.store.dispatch(actionPersistInsurance(this.dataInsurances));
                });

        this.dataSource.connect().subscribe(
            data => {
                console.log(data);
            }
        )

    }

    ngOnInit() {
        this.loader.display(false);
    }

    ngAfterViewInit() {
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
    }

    openMember(_id: any) {
        this._dialog.openMember(_id);
    }

    applyFilter(filterValue: string) {
        filterValue = filterValue.trim(); // Remove whitespace
        filterValue = filterValue.toLowerCase(); // MatTableDataSource defaults to lowercase matches
        this.dataSource.filter = filterValue;
        console.log(this.dataSource);
    }

    done(object: ICredit) {
        return (object.paid >= object.amount) ? true : false;
    }

    getMember(nik: string) {
        return this.members.filter(data => data.nik === nik)[0];
    }

    monthlyPay(object: ICredit) {
        return object.amount / object.time_periods;
    }

    dateFilter() {
        // console.log(this.dataSource.filteredData);
        if (this.option.from_date && this.option.to_date) {
            let fromDate = new Date(this.option.from_date);
            let toDate = new Date(this.option.to_date);
            // max time limit
            toDate.setHours(23, 59, 59, 400);

            let f = this.credits;

            let r = f.filter(o => new Date(o.created_at) >= fromDate && new Date(o.created_at) <= toDate);

            this.dataSource.data = r;
        } else {
            console.log("not ready");
        }
    }

    runDialog(object: ICredit = null) {
        let dialogRef = this.dialog.open(SCreditComponent, {
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