import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { MatPaginator, MatTableDataSource } from '@angular/material';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

import { InsuranceDataService } from '../insurance-data.service';
import { SingleInsuranceComponent } from '../single-insurance/single-insurance.component';

import { ANIMATE_ON_ROUTE_ENTER } from '@app/core';

import { Subject } from 'rxjs/Subject';
import { takeUntil } from 'rxjs/operators/takeUntil';
import { Store } from '@ngrx/store';
import { IInsurance, selectorInsurances, actionPersistInsurance, actionInitInsurance, actionAddInsurance, IInsuranceProfile } from '@app/insurance/insurance.reducer';
import { Observable } from 'rxjs/Observable';
import { environment } from '@env/environment';
import { LoaderService } from '@app/loader.service';
// import { GoogleMap } from '@agm/core/services/google-maps-types';

@Component({
    selector: 'anms-all-insurance',
    templateUrl: './all-insurance.component.html',
    styleUrls: ['./all-insurance.component.scss']
})
export class AllInsuranceComponent implements OnInit, OnDestroy {

    // title: string = 'My first AGM project';
    // lat: number = 51.678418;
    // lng: number = 7.809007;
    // gMap: GoogleMap;

    private unsubscribe$: Subject<void> = new Subject<void>();

    dataInsurances: Observable<IInsurance[]>;

    displayedColumns = ['name', 'email', 'phone', 'action'];
    dataSource = new MatTableDataSource();

    animateOnRouteEnter = ANIMATE_ON_ROUTE_ENTER;

    @ViewChild(MatPaginator) paginator: MatPaginator;

    constructor(
        private store: Store<IInsurance[]>,
        private dataService: InsuranceDataService,
        public dialog: MatDialog,
        private loaderService: LoaderService) {
        // this.dataInsurances = store.select('insurances');
        // console.log(this.dataInsurances);
        // this.dataSource.data = this.dataInsurances;
        this.store
            .select(selectorInsurances)
            .pipe(takeUntil(this.unsubscribe$))
            .subscribe(
            result => {
                this.dataInsurances = result;
                this.dataSource.data = result;
                if (!environment.production)
                    console.log("subscribe", this.dataInsurances);
                // this.store.dispatch(actionPersistInsurance(this.dataInsurances));
            });
    }

    ngOnInit() {
        // this.loaderService.display(true);
        // this.dataService.getAll()
        //     .pipe(takeUntil(this.unsubscribe$))
        //     .subscribe(
        //     result => {

        //         this.loaderService.display(false);

        //         if (!environment.production)
        //             console.log('all data insurances', result);

        //         // caching data in store
        //         this.store.dispatch(actionInitInsurance(result.data));

        //     });
    }

    ngOnDestroy(): void {
        this.unsubscribe$.next();
        this.unsubscribe$.complete();
    }

    // onMapReady(event) {
    //     console.log("event", event);
    //     this.gMap = event;
    // }

    // onCenterChange(event){
    //     console.log(event);
    //     this.lat = event.lat;
    //     this.lng = event.lng;
    // }

    // mapAct(){
    //     console.log(this.gMap.getCenter().lat());
    //     this.lat = this.gMap.getCenter().lat();
    //     this.lng = this.gMap.getCenter().lng();
    // }

    getMore(page: number) {
        this.dataService.getAllPage(page)
            .pipe(takeUntil(this.unsubscribe$))
            .subscribe(
            data => {
                // console.log(data);
                // this.data.join(data.data);
                // this.dataSource = new MatTableDataSource<any>(data.data);
                data.data.insurance_profiles.forEach(element => {
                    // this.data.push(element);
                    // this.dataSource.data.push(element);
                    this.store.dispatch(actionAddInsurance(element));
                });
                this.dataSource.paginator = this.paginator;
                // console.log(this.dataSource.data);
                if (data.meta.current_page < data.meta.last_page) {
                    this.getMore(++data.meta.current_page);
                }
            }, err => {
                if (!environment.production) {
                    console.log(err);
                }
            }
            )
    }

    ngAfterViewInit() {
        this.dataSource.paginator = this.paginator;
    }

    applyFilter(filterValue: string) {
        filterValue = filterValue.trim(); // Remove whitespace
        filterValue = filterValue.toLowerCase(); // MatTableDataSource defaults to lowercase matches
        this.dataSource.filter = filterValue;
    }

    runDialog(id: string = null, mode: string): void {

        const object = (id != null) ? this.dataSource.data.filter((data: IInsuranceProfile) => data.id === id)[0] : null;
        let dialogRef = this.dialog.open(SingleInsuranceComponent, {
            width: '900px',
            height: '600px',
            data: {
                id: id,
                object: object,
                mode: mode
            }
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
