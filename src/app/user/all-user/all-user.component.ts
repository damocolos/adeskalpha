import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatTableDataSource } from '@angular/material';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

import { UserDataService } from '@app/user/user-data.service';
import { SingleUserComponent } from '@app/user/single-user/single-user.component';
import { Store } from '@ngrx/store';
// import { IUser, selectorUsers, actionInitUser, actionAddUser } from '@app/user/user.reducer';
import { IUser, selectorUsers, actionInitUser, actionAddUser } from '@app/core/user/user.reducer';
import { Subject } from 'rxjs/Subject';
import { takeUntil } from 'rxjs/operators/takeUntil';
import { LoaderService } from '@app/loader.service';
import { environment } from '@env/environment';

@Component({
    selector: 'anms-all-user',
    templateUrl: './all-user.component.html',
    styleUrls: ['./all-user.component.scss']
})
export class AllUserComponent implements OnInit {

    private unsubscribe$: Subject<void> = new Subject<void>();

    displayedColumns = ['username', 'email', 'action'];
    dataSource = new MatTableDataSource();

    @ViewChild(MatPaginator) paginator: MatPaginator;

    constructor(
        private store: Store<IUser[]>,
        public dataService: UserDataService,
        public dialog: MatDialog,
        private loader: LoaderService
    ) {
        this.store
        .select(selectorUsers)
        .pipe(takeUntil(this.unsubscribe$))
        .subscribe(
            result => {

                if(!environment.production)
                    console.log('user subscribe', result.users);

                this.dataSource.data = result.users;
            }
        )
    }

    ngOnInit() {
        this.loader.display(true);
        this.dataService.getAll()
        .subscribe(
            result => {
                this.loader.display(false);
                // this.data = data.data;
                // this.dataSource = new MatTableDataSource<any>(data.data);
                // this.dataSource.data = data.data;
                this.store.dispatch(actionInitUser(result.data));
                // if(data.meta.current_page < data.meta.last_page) {
                //     this.getMore(++data.meta.current_page);
                // }
            }
        )
    }

    getMore(page: number) {
        this.dataService.getAllPage(page)
        .subscribe(
            data => {
                // console.log(data);
                // this.data.join(data.data);
                // this.dataSource = new MatTableDataSource<any>(data.data);
                data.data.forEach(element => {
                    // this.data.push(element);
                    // this.dataSource.data.push(element);
                    this.store.dispatch(actionAddUser(element));
                });
                this.dataSource.paginator = this.paginator;
                // console.log(this.dataSource.data);
                if(data.meta.current_page < data.meta.last_page) {
                    this.getMore(++data.meta.current_page);
                }
            }, err => {
                console.log(err);
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

    runDialog(id: string = null, mode: string): void{
        const object = (id != null) ? this.dataSource.data.filter((data: IUser) => data.id === id)[0] : null;
        let dialogRef = this.dialog.open(SingleUserComponent, {
            width: '500px',
            data: { 
                id: id,
                object: object,
                mode: mode
            }
          });
      
          dialogRef.afterClosed().subscribe(result => {;
            // check result
            if(result){
                if(result.status == 'create') {
                    // change view
                    // add data
                    // this.dataSource.data.push(result.data);
                    this.dataSource.paginator = this.paginator;
                } else if(result.status == 'update') {
                    // change view
                    // this.dataSource.data.forEach((element, key) => {
                    //     if(element['id'] === result.data.id){
                    //         let data = this.dataSource.data;
                    //         // change data
                    //         data[key] = result.data;
                    //         // return data
                    //         this.dataSource.data = data;
                    //     }
                    // });
                } else if(result.status == 'delete') {
                    // this.dataSource.data.forEach((element, key) => {
                    //     if(element['id'] === result.data.id){
                    //         let data = this.dataSource.data;
                    //         // remove data
                    //         data.splice(key,1);
                    //         // return data
                    //         this.dataSource.data = data;
                    //     }
                    // });
                }
            }
          });
    }

}
