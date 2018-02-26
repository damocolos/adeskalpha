import { Component, Inject, OnDestroy } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { InsuranceDataService } from '@app/insurance/insurance-data.service';

import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AlertDialogComponent } from '@app/shared/alert-dialog/alert-dialog.component';
import { Subject } from 'rxjs/Subject';
import { takeUntil } from 'rxjs/operators/takeUntil';
import { Store } from '@ngrx/store';
import { IInsurance, actionAddInsurance, actionUpdateInsurance, actionRemoveInsurance } from '@app/insurance/insurance.reducer';
import { environment } from '@env/environment';
import { LocPickerComponent } from '@app/insurance/loc-picker/loc-picker.component';
import { FileGalleryDialogComponent } from '@app/shared/file-gallery-dialog/file-gallery-dialog.component';
import { LoaderService } from '@app/loader.service';
import { selectorUsers, IUser } from '@app/core/user/user.reducer';

@Component({
    selector: 'anms-single-insurance',
    templateUrl: './single-insurance.component.html',
    styleUrls: ['./single-insurance.component.scss']
})
export class SingleInsuranceComponent implements OnDestroy {

    private unsubscribe$: Subject<void> = new Subject<void>();

    insuranceData;
    mode: string;
    insuranceForm: FormGroup;
    userData: IUser[];

    constructor(
        private store: Store<IInsurance[]>,
        public dataService: InsuranceDataService,
        public fb: FormBuilder,
        public dialogRef: MatDialogRef<any>,
        @Inject(MAT_DIALOG_DATA) public data: any,
        public dialog: MatDialog,
        private loader: LoaderService
    ) {
        this.mode = this.data.mode;
        if (!environment.production) {
            console.log('data object', data);
        }

        this.createForm();
        if (this.mode == 'create') {
            this.insuranceData = 'create';
        } else {
            this.insuranceData = this.data.object;
            this.fillForm(this.data.object);
        }

        // get user
        this.store
            .select(selectorUsers)
            .subscribe(
            result => {
                if (!environment.production)
                    console.log("subscribe user", result);

                this.userData = result;
            });
    }

    ngOnDestroy(): void {
        this.unsubscribe$.next();
        this.unsubscribe$.complete();
    }

    createForm() {
        let email: any;
        if (this.data.mode == 'create') {
            email = [
                '',
                [Validators.required, Validators.email]
            ];
        } else {
            email = [
                { value: '', disabled: true },
                [Validators.required, Validators.email]
            ];
        }
        let form = {
            'id': [''],
            'name': ['', Validators.required],
            'email': ['', [Validators.required, Validators.email]],
            'phone': ['', Validators.required],
            'detail': ['', Validators.required],
            'address': ['', Validators.required],
            'lat': ['', { disabled: true }, Validators.required],
            'lng': ['', { disabled: true }, Validators.required],
            'logo': ['', Validators.required],
            'logoFile': []
        };
        if (this.data.mode == 'create') {
            form['username'] = ['', Validators.required];
        }
        this.insuranceForm = this.fb.group(form);
    }

    fillForm(data: any) {
        // fill form with existed data
        this.insuranceForm.patchValue({
            'id': data.id,
            'name': data.insurance.name,
            'email': data.insurance.email,
            'phone': data.phone,
            'detail': data.detail,
            'address': data.address,
            'lat': data.lat,
            'lng': data.lng,
            'logo': data.logo,
        });
    }

    getImageUrl(image: string): string {
        return (image) ? `url(${environment.app.IMAGE_URL}/${image})` : `url('../../../assets/logo.png')`;
        // console.log("image", image);
    }

    getImage(image: string): string {
        return `${environment.app.IMAGE_URL}/${image}`;
    }

    changeMode() {
        this.mode = (this.mode == 'show') ? 'edit' : 'show';
    }

    openLocPicker() {
        let dialogRef = this.dialog.open(LocPickerComponent, {
            width: '900px',
            height: '600px',
            data: {
                lat: this.insuranceForm.get('lat').value,
                lng: this.insuranceForm.get('lng').value
            }
        });

        dialogRef.afterClosed().subscribe(result => {
            // check result
            if (!environment.production) {
                console.log('loc picker result', result);
            }

            if (result) {
                this.insuranceForm.patchValue(
                    {
                        lat: result.lat,
                        lng: result.lng
                    }
                )
            }
        });
    }

    // depreceted
    uploadFile() {
        if (this.insuranceForm.get('logoFile').value != null) {

            // create form data
            let fd = new FormData();
            const newValue = this.insuranceForm.get('logoFile').value.files[0];
            // append image attr
            fd.append('image', newValue, newValue.name);

            // upload file with form data
            this.dataService.uploadFile(fd)
                .pipe(takeUntil(this.unsubscribe$))
                .subscribe(
                result => {

                    // add result url to insurane form
                    this.insuranceForm.patchValue({
                        'logo': result.url
                    });
                }, err => {
                    if (!environment.production) {
                        console.log("uploadfile", err);
                    }
                }
                )
        }
    }

    filePicker() {
        let dialogRef = this.dialog.open(FileGalleryDialogComponent, {
            width: '900px',
            height: '600px',
            data: {
                message: "Pick Image"
            }
        });

        dialogRef.afterClosed().subscribe(result => {
            if (result) {
                this.insuranceForm.patchValue({
                    'logo': result.url
                });
            }
        });

    }

    save() {
        // saving
        if (this.insuranceForm.valid) {
            // show loader
            this.loader.display(true);
            // create data
            if (this.mode == 'create') {

                // const data = this.prepareSave();

                // prepare data
                const data = {
                    name: this.insuranceForm.get('name').value,
                    email: this.insuranceForm.get('email').value,
                    username: this.insuranceForm.get('username').value,
                };

                // create data insurance first
                this.dataService.create(data)
                    .pipe(takeUntil(this.unsubscribe$))
                    .subscribe(
                    result => {

                        if (!environment.production)
                            console.log('create', result);

                        // get insurance profile
                        this.dataService.getSingleInsurance(result.id)
                            .pipe(takeUntil(this.unsubscribe$))
                            .subscribe(
                            result2 => {
                                if (!environment.production)
                                    console.log('get single', result2);

                                // prepare data
                                const data = {
                                    _id: result2.profile.id,
                                    phone: this.insuranceForm.get('phone').value,
                                    detail: this.insuranceForm.get('detail').value,
                                    address: this.insuranceForm.get('address').value,
                                    lat: this.insuranceForm.get('lat').value,
                                    lng: this.insuranceForm.get('lng').value,
                                    logo: this.insuranceForm.get('logo').value,
                                };

                                if (!environment.production)
                                    console.log('update profile', data);

                                this.dataService.updateProfile(data)
                                    .pipe(takeUntil(this.unsubscribe$))
                                    .subscribe(
                                    result3 => {

                                        if (!environment.production)
                                            console.log('update profile', result3);

                                        result3.insurance = result;

                                        if (!environment.production)
                                            console.log('update profile', result3);

                                        this.store.dispatch(actionAddInsurance(result3));
                                        // return value
                                        let r = {
                                            status: 'create'
                                        }
                                        this.loader.display(false);
                                        this.dialogRef.close(r);
                                    })
                            });


                    }
                    )
            } else {
                // update data
                // connection
                const dataInsurance = {
                    _id: this.insuranceData.insurance.id,
                    name: this.insuranceForm.get('name').value
                }
                const dataInsuranceProfile = {
                    _id: this.insuranceForm.get('id').value,
                    email: this.insuranceForm.get('email').value,
                    phone: this.insuranceForm.get('phone').value,
                    detail: this.insuranceForm.get('detail').value,
                    address: this.insuranceForm.get('address').value,
                    lat: this.insuranceForm.get('lat').value,
                    lng: this.insuranceForm.get('lng').value,
                    logo: this.insuranceForm.get('logo').value,
                };

                if (!environment.production) {
                    console.log('data insurance', dataInsurance);
                    console.log('data insurance profile', dataInsuranceProfile);
                }

                // update insurance
                this.dataService.update(dataInsurance)
                    .pipe(takeUntil(this.unsubscribe$))
                    .subscribe(
                    result => {

                        if (!environment.production)
                            console.log('insurance updated', result);

                        // update insurance profile
                        this.dataService.updateProfile(dataInsuranceProfile)
                            .pipe(takeUntil(this.unsubscribe$))
                            .subscribe(
                            result2 => {

                                if (!environment.production)
                                    console.log('insurance profile updated', result2);

                                result2.insurance = result;

                                // update insurance store 
                                this.store.dispatch(actionUpdateInsurance(result2));
                                // return value
                                let r = {
                                    status: 'update',
                                    // data: data.data
                                }
                                this.loader.display(false);
                                this.dialogRef.close(r);
                            }
                            )

                    }
                    )
            }
        }
    }

    // prepare data before save
    prepareSave(): any {
        let fd = new FormData();
        fd.append('id', this.insuranceForm.get('id').value);
        fd.append('name', this.insuranceForm.get('name').value);
        fd.append('email', this.insuranceForm.get('email').value);
        fd.append('address', this.insuranceForm.get('address').value);
        fd.append('region', this.insuranceForm.get('region').value);
        if (this.insuranceForm.get('logo').value != null) {
            const newValue = this.insuranceForm.get('logo').value.files[0];
            fd.append('logo', newValue, newValue.name);
        }
        return fd;
    }

    // delete data
    delete() {
        // show confirm dialog
        let dialogRef = this.dialog.open(AlertDialogComponent, {
            width: '400px',
            data: {
                message: "Delete this insurance ?"
            }
        });

        // after closed confirmation
        dialogRef.afterClosed().subscribe(result => {
            if (result) {
                this.loader.display(true);
                this.dataService.delete(this.insuranceData.insurance.id)
                    .pipe(takeUntil(this.unsubscribe$))
                    .subscribe(
                    data => {
                        this.store.dispatch(actionRemoveInsurance(this.insuranceData.id));
                        let r = {
                            status: 'delete',
                            // data: this.insuranceData
                        }
                        this.dialogRef.close(r);
                        this.loader.display(false);
                    }
                    )
            }
        });
    }

}
