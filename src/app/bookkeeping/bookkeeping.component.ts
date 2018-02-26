import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Store } from '@ngrx/store';
import { environment } from '@env/environment';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators/takeUntil';
import { MatTableDataSource, MatPaginator, MatSort } from '@angular/material';
import { IBookkeeping, selectorBookkeepings } from '@app/bookkeeping/bookkeeping.reducer';
import { WindowRef } from '@app/bookkeeping/winref.service';
import { selectorMembers, IMember, actionUpdateResultMember } from '@app/member/member.reducer';
import { IDeposit, selectorDeposits } from '@app/deposit/deposit.reducer';
import { ICredit, selectorCredits } from '@app/credit/credit.reducer';
import { Router } from '@angular/router';
import { LoaderService } from '@app/loader.service';

@Component({
    selector: 'anms-bookkeeping',
    templateUrl: './bookkeeping.component.html',
    styleUrls: ['./bookkeeping.component.scss']
})
export class BookkeepingComponent implements OnInit {

    displayedColumns = ['type', 'amount', 'date', 'action'];
    displayedColumnsMember = [
        'nik',
        'name',
        'deposit',
        'deposit_result',
        'credit',
        'credit_result',
        'total_shu'
    ];
    dataSource = new MatTableDataSource();
    dataSourceMember = new MatTableDataSource();
    @ViewChild(MatPaginator) paginator: MatPaginator;
    @ViewChild('paginatorMember') paginatorMember: MatPaginator;

    @ViewChild(MatSort) sort: MatSort;
    @ViewChild('table') sortBook: MatSort;
    @ViewChild('tableMember') sortMember: MatSort;

    bookkeepings: IBookkeeping[] = [];
    members: IMember[] = [];
    deposits: IDeposit[] = [];
    credits: ICredit[] = [];

    monthlyCharts: any = new Charts();
    depositCharts: any = new Charts();
    creditCharts: any = new Charts();
    shuCharts: any = new Charts();

    shu = {
        deposit: 0,
        credit: 0,
        management: 0,
        csr: 0,
        company: 0
    };

    // print
    @ViewChild('printEl') printEl: ElementRef;

    private unsubscribe$: Subject<void> = new Subject<void>();

    nativeWindow: any;

    constructor(
        public store: Store<IBookkeeping[]>,
        private router: Router,
        private loader: LoaderService,
        private winRef: WindowRef
    ) {
        this.nativeWindow = winRef.getNativeWindow();

        this.monthlyCharts.setScheme(['#5AA454', '#A10A28', '#C7B42C', '#AAAAAA']);
        this.depositCharts.setScheme(['#FFEB3B', '#AAAAAA']);
        this.creditCharts.setScheme(['#f44336', '#AAAAAA']);
        this.shuCharts.setScheme(['#D50000', '#AA00FF', '#00C853', '#FFD600', '#2962FF', '#AEEA00', '#6200EA']);

        this.store
            .select(selectorBookkeepings)
            .pipe(takeUntil(this.unsubscribe$))
            .subscribe(
                result => {
                    this.dataSource.data = result;
                    this.bookkeepings = result;
                    if (!environment.production)
                        console.log('subscribe', result);
                    // this.store.dispatch(actionPersistInsurance(this.dataInsurances));
                });

        this.store
            .select(selectorMembers)
            .pipe(takeUntil(this.unsubscribe$))
            .subscribe(
                result => {
                    this.members = result;
                    this.dataSourceMember.data = result;
                    if (!environment.production)
                        console.log('subscribe', result);
                    // this.store.dispatch(actionPersistInsurance(this.dataInsurances));
                });

        this.store
            .select(selectorDeposits)
            .pipe(takeUntil(this.unsubscribe$))
            .subscribe(
                result => {
                    this.deposits = result;
                    if (!environment.production)
                        console.log('subscribe', result);
                    // this.store.dispatch(actionPersistInsurance(this.dataInsurances));
                });

        this.store
            .select(selectorCredits)
            .pipe(takeUntil(this.unsubscribe$))
            .subscribe(
                result => {
                    this.credits = result;
                    if (!environment.production)
                        console.log('subscribe', result);
                    // this.store.dispatch(actionPersistInsurance(this.dataInsurances));
                });

        this.buildCharts();
        this.memberCalculate();

    }

    buildCharts() {

        let monthlyCharts = [];
        let depositCharts = [];
        let creditCharts = [];

        let monthlyData = [];

        let totalMarkAmount: number = 0; // shu

        for (let index = 0; index < this.bookkeepings.length; index++) {
            let dn = this.bookkeepings[index];

            let dt = new Date(dn.date);
            let mn = dt.getMonth() + 1;
            let yn = +dt.getFullYear().toString().substr(2, 2);
            let dateN = dt.getDate();
            let markMonth = mn - 1;

            if (markMonth == 0) { markMonth = 12; yn--; }

            if (monthlyData[`${markMonth}${yn}`]) {
                monthlyData[`${markMonth}${yn}`].amount += dn.amount;
            } else {
                monthlyData[`${markMonth}${yn}`] = {
                    month: markMonth,
                    year: yn,
                    amount: dn.amount
                }
            }

            let d = {
                'name': `${dateN}/${mn}/${yn}`,
                'value': dn.amount,
                'sort': `${dateN}/${yn}${mn}`
            };

            totalMarkAmount += dn.amount;

            if (dn.type === 'deposit') { // need some add calculation - 1 layer again
                depositCharts = [...depositCharts, d];
            } else if (dn.type === 'credit') { // need some add calculation - 1 layer again
                creditCharts = [...creditCharts, d];
            }
        }

        monthlyData.forEach(
            data => {
                let d = {
                    name: `${data.month}/${data.year}`,
                    value: data.amount,
                    sort: `${data.year}${data.month}`
                };
                monthlyCharts = [...monthlyCharts, d];
            }
        );

        this.shuCalculate(totalMarkAmount);

        monthlyCharts = this.sortArray(monthlyCharts);
        depositCharts = this.sortArray(depositCharts);
        creditCharts = this.sortArray(creditCharts);

        this.monthlyCharts.results = [...this.monthlyCharts.results, {
            name: 'mark',
            series: monthlyCharts
        }];

        this.depositCharts.results = [...this.depositCharts.results, {
            name: 'in',
            series: depositCharts
        }];

        this.creditCharts.results = [...this.creditCharts.results, {
            name: 'out',
            series: creditCharts
        }];
    }

    sortArray(arr: any[]): any[] {
        return arr.sort((leftSide, rightSide) => {
            if (leftSide.sort < rightSide.sort) return -1;
            if (leftSide.sort > rightSide.sort) return 1;
            return 0;
        });
    }

    onSelect(event) {
        return true;
    }

    shuCalculate(total: number) {
        // 20% deposit
        // 20% credit
        // 10% management
        // 10% csr
        // 40% company
        this.shu.deposit = 0.2 * total;
        this.shu.credit = 0.2 * total;
        this.shu.management = 0.1 * total;
        this.shu.csr = 0.15 * total;
        this.shu.company = 0.35 * total;

        // build shu charts
        this.shuCharts.results = [
            {
                name: 'deposit',
                value: this.shu.deposit
            },
            {
                name: 'credit',
                value: this.shu.credit
            },
            {
                name: 'management',
                value: this.shu.management
            },
            {
                name: 'csr',
                value: this.shu.csr
            },
            {
                name: 'company',
                value: this.shu.company
            }
        ];
    }

    memberCalculate() {
        let total_deposit = 0;
        let total_credit = 0;
        this.deposits.forEach(r => {
            total_deposit += r.amount;
        });
        this.credits.forEach(r => {
            total_credit += r.amount;
        });
        this.members.forEach( data => {
            let deposit = 0;
            let credit = 0;
            let deposit_result = 0;
            let credit_result = 0;
            let updated = false;
            let d = this.deposits.filter( r => r.nik === data.nik );
            // calc total deposit
            if(d.length > 0) {
                d.forEach( r => deposit += r.amount );
                updated = true;
            }
            // calc total credit
            let c = this.credits.filter( r => r.nik === data.nik );
            if(c.length > 0) {
                d.forEach( r => credit += r.amount );
                updated = true;
            }

            if(deposit > 0)
                deposit_result = ( deposit / total_deposit ) * this.shu.deposit;
            
            if(credit > 0)
                credit_result = ( credit / total_credit ) * this.shu.credit;
            
            if(updated) {
                this.store.dispatch(actionUpdateResultMember({
                    nik: data.nik,
                    deposit: deposit,
                    credit: credit,
                    deposit_result: deposit_result,
                    credit_result: credit_result,
                    total_shu: deposit_result + credit_result,
                }));
            }
        });
    }

    ngOnInit() {
        this.loader.display(false);
    }

    ngAfterViewInit() {
        this.dataSource.paginator = this.paginator;
        this.dataSourceMember.paginator = this.paginatorMember;
        this.dataSource.sort = this.sortBook;
        this.dataSourceMember.sort = this.sortMember;
    }

    goPrint() {
        this.router.navigate(['/print/bookkeeping']);
        // this.pdfmake.print();
        // window.print();
        // console.log(this.printEl);
        // this.printingService.print(this.printEl.nativeElement);
        // Open used in new window
        // let newWindow = this.nativeWindow.open('/print/bookkeeping');
        // let data = document.getElementsByClassName("print-area")[0].innerHTML;
        // let newWindow = this.nativeWindow.open("data:text/html," + encodeURIComponent(data), "_blank");
        // newWindow.focus();
    }

    open() {
        // this.pdfmake.open();
        // window.print();
        // console.log(this.printEl);
        // this.printingService.print(this.printEl.nativeElement);
    }

    download() {
        // this.pdfmake.download();
        // window.print();
        // console.log(this.printEl);
        // this.printingService.print(this.printEl.nativeElement);
    }

    applyFilter(filterValue: string) {
        filterValue = filterValue.trim(); // Remove whitespace
        filterValue = filterValue.toLowerCase(); // MatTableDataSource defaults to lowercase matches
        this.dataSource.filter = filterValue;
    }

    applyFilterMember(filterValue: string) {
        filterValue = filterValue.trim(); // Remove whitespace
        filterValue = filterValue.toLowerCase(); // MatTableDataSource defaults to lowercase matches
        this.dataSourceMember.filter = filterValue;
    }
}

class Charts {
    public view = [];
    public showXAxis = true;
    public showYAxis = true;
    public gradient = false;
    public showLegend = false;
    public showXAxisLabel = true;
    public xAxisLabel = 'Date';
    public showYAxisLabel = true;
    public yAxisLabel = 'Amount(IDR)';
    public autoScale = true;
    public scheme = {
        domain: []
    };
    public single = [
        {
            "name": "Germany",
            "value": 8940000
        },
        {
            "name": "USA",
            "value": 5000000
        },
        {
            "name": "France",
            "value": 7200000
        }
    ];
    public results = [];

    constructor() {

    }

    setScheme(object: any) {
        this.scheme.domain = object;
    }
}