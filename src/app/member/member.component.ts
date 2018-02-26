import { Component, OnInit, ViewChild } from '@angular/core';
import { Store } from '@ngrx/store';
import { IMember, selectorMembers } from '@app/member/member.reducer';
import { environment } from '@env/environment';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators/takeUntil';
import { MatTableDataSource, MatPaginator, MatDialog } from '@angular/material';
import { SMemberComponent } from '@app/member/s-member/s-member.component';
import { LoaderService } from '@app/loader.service';

@Component({
    selector: 'anms-member',
    templateUrl: './member.component.html',
    styleUrls: ['./member.component.scss']
})
export class MemberComponent implements OnInit {

    displayedColumns = ['nik', 'name', 'email', 'date', 'action'];
    dataSource = new MatTableDataSource();
    @ViewChild(MatPaginator) paginator: MatPaginator;

    private unsubscribe$: Subject<void> = new Subject<void>();

    // charts
    charts_gender: any[] = [];
    charts_age: any[] = [];
    showXAxis = true;
    showYAxis = true;
    gradient = false;
    showXAxisLabel = true;
    xAxisLabel = 'Gender';
    showYAxisLabel = true;
    yAxisLabel = 'Population';
    // options
    showLegend = false;
    colorScheme = {
        domain: ['#f44336', '#2196F3', '#4CAF50', '#CDDC39', '#FFEB3B']
    };
    // pie
    showLabels = true;
    explodeSlices = true;
    doughnut = false;

    constructor(
        public store: Store<IMember[]>,
        public loader: LoaderService,
        public dialog: MatDialog ) {
        this.store
            .select(selectorMembers)
            .pipe(takeUntil(this.unsubscribe$))
            .subscribe(
                result => {
                    this.dataSource.data = result;
                    this.buildCharts(result);
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

    runDialog(object: IMember = null) {
        let dialogRef = this.dialog.open(SMemberComponent, {
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

    buildCharts(data: IMember[]) {
        this.charts_gender = [];
        this.charts_age = [];
        let i = 0;
        let genderAnalitycs: any = { p: 0, l: 0 }
        let ageAnalitycs: any = [];
        while (i < data.length) {
            (data[i].gender == 'L') ? genderAnalitycs.l++ : genderAnalitycs.p++;
            let age = this.calcAge(data[i].birth_date);
            if (ageAnalitycs[age]) {
                ageAnalitycs[age].value++;
            } else {
                ageAnalitycs[age] = {
                    name: age,
                    value: 1
                };
            }
            i++;
        }
        // sort
        ageAnalitycs.sort((leftSide, rightSide) => {
            if (leftSide.name < rightSide.name ) return -1;
            if (leftSide.name > rightSide.name) return 1;
            return 0;
        });

        this.charts_gender = [
            {
                name: 'Total',
                value: data.length
            },
            {
                name: 'Laki-laki',
                value: genderAnalitycs.l
            },
            {
                name: 'Perempuan',
                value: genderAnalitycs.p
            }
        ];
        ageAnalitycs.forEach((val, key) => {
            this.charts_age = [...this.charts_age, { name: val.name + ' yo', value: val.value }];
        });
    }

    calcAge(dateString) {
        var birthday = +new Date(dateString);
        return ~~((Date.now() - birthday) / (31557600000));
    }

}
