import { Component, OnInit, ViewChild } from '@angular/core';
import { Store } from '@ngrx/store';
import { selectorPrint, IPrint } from '@app/static/print/print.reducer';
import { IMember, selectorMembers } from '@app/member/member.reducer';
import { MatTableDataSource, MatPaginator, MatSort } from '@angular/material';
import { Router } from '@angular/router';

@Component({
    selector: 'anms-print-bookkeeping',
    templateUrl: './print-bookkeeping.component.html',
    styleUrls: ['./print-bookkeeping.component.scss']
})
export class PrintBookkeepingComponent implements OnInit {

    printOptions: IPrint;
    members: IMember[] = [];

    displayedColumns = [
        'nik',
        'name',
        'deposit',
        'deposit_result',
        'credit',
        'credit_result',
        'total_shu'
    ];
    dataSource = new MatTableDataSource();
    @ViewChild(MatPaginator) paginator: MatPaginator;
    @ViewChild(MatSort) sort: MatSort;

    constructor(
        private store: Store<any>,
        public router: Router
    ) {
        this.store
            .select(selectorPrint)
            .subscribe(
                result => {
                    this.printOptions = result;
                }
            );

        this.store
            .select(selectorMembers)
            .subscribe(
                result => {
                    this.members = result;
                    this.dataSource.data = result;
                    console.log(result);
                }
            );
    }

    ngOnInit() {
    }

    ngAfterViewInit() {
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
    }

    onPrint() {
        window.print();
    }

    onBack() {
        this.router.navigate(['/page/bookkeeping']);
    }

}
