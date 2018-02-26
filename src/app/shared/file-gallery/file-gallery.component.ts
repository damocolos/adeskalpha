import { Component, OnInit, Inject, Input, Output, EventEmitter } from '@angular/core';
import { Store } from '@ngrx/store';
import { IMedia, selectorMedias, actionInitMedia, actionRemoveMedia, actionAddMedia } from '@app/media/media.reducer';
import { takeUntil } from 'rxjs/operators/takeUntil';
import { Subject } from 'rxjs/Subject';
import { ANIMATE_ON_ROUTE_ENTER } from '@app/core';
import { MatDialog } from '@angular/material';
import { AlertDialogComponent } from '@app/shared/alert-dialog/alert-dialog.component';
import { environment } from '@env/environment';
import { FormGroup, FormBuilder } from '@angular/forms';
import { FileGalleryDataService } from '@app/shared/file-gallery/file-gallery-data.service';
import { LoaderService } from '@app/loader.service';

@Component({
    selector: 'anms-file-gallery',
    templateUrl: './file-gallery.component.html',
    styleUrls: ['./file-gallery.component.scss']
})
export class FileGalleryComponent {

    private unsubscribe$: Subject<void> = new Subject<void>();

    data: IMedia[];

    selected: any;
    formGroup: FormGroup;

    animateOnRouteEnter = ANIMATE_ON_ROUTE_ENTER;

    @Input() galColumn: number = 4;
    @Input() exClass: string = '';
    @Output() onSetFile: EventEmitter<any> = new EventEmitter<any>();

    constructor(
        private loader: LoaderService,
        private store: Store<IMedia[]>,
        private dataService: FileGalleryDataService,
        public dialog: MatDialog,
        public fb: FormBuilder
    ) {
        this.store
            .select(selectorMedias)
            .pipe(takeUntil(this.unsubscribe$))
            .subscribe(
            result => {
                this.data = result;
                if (!environment.production)
                    console.log('media sub', result);
            }
            );

        this.createForm();
    }

    ngOnInit() {
        // this.loader.display(true);
        // this.dataService.getAll()
        //     .subscribe(
        //     result => {
        //         this.loader.display(false);
        //         if (!environment.production)
        //             console.log('get all data media', result);

        //         this.store.dispatch(actionInitMedia(result.data));
        //     }
        //     )
    }

    createForm() {
        this.formGroup = this.fb.group({
            'file': ['']
        });
    }

    uploadFile() {
        // create form data
        let fd = new FormData();
        const newValue = this.formGroup.get('file').value.files[0];
        // append image attr
        fd.append('image', newValue, newValue.name);
        if (!environment.production)
            console.log("data file", this.formGroup.value);

        this.loader.display(true);

        // upload file with form data
        this.dataService.uploadFile(fd)
            .pipe(takeUntil(this.unsubscribe$))
            .subscribe(
            result => {
                if (!environment.production)
                    console.log("result", result);

                this.formGroup.patchValue({
                    'file': ''
                });
                this.store.dispatch(actionAddMedia(result));
                this.loader.display(false);
            }
            )
    }

    getImage(url: string): string {
        return this.dataService.getImage(url);
    }

    getImageB(url: string): string {
        return `url(${this.dataService.getImage(url)})`;
    }

    getKb(byte: any): string {
        return `${byte / 1000} KB`;
    }

    onSelect(data: any) {
        this.selected = data;
        this.onSetFile.emit(data);
    }

    delete() {


        // show confirm dialog
        let dialogRef = this.dialog.open(AlertDialogComponent, {
            width: '400px',
            data: {
                message: "delete this media ?"
            }
        });

        // after closed confirmation
        dialogRef.afterClosed().subscribe(result => {
            if (result) {
                this.loader.display(true);
                this.dataService.delete(this.selected)
                    .subscribe(
                    result => {
                        if (!environment.production)
                            console.log('delete result', result);

                        this.loader.display(false);
                        this.store.dispatch(actionRemoveMedia(this.selected.id));
                        this.selected = null;
                        this.onSetFile.emit(null);
                    }
                    );

            } else {
                // this.loader.status = false;
            }
        });
    }

}
