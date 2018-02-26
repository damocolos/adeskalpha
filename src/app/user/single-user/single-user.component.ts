import { Component, Inject } from '@angular/core';
import { MatSnackBar, MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AlertDialogComponent } from '@app/shared/alert-dialog/alert-dialog.component';
import { UserDataService } from '@app/user/user-data.service';
import { Store } from '@ngrx/store';
import { IUser, actionAddUser, actionUpdateUser, actionRemoveUser } from '@app/user/user.reducer';
import { environment } from '@env/environment';
import { LoaderService } from '@app/loader.service';

@Component({
    selector: 'anms-single-user',
    templateUrl: './single-user.component.html',
    styleUrls: ['./single-user.component.scss']
})
export class SingleUserComponent {

    userData;
    mode: string;
    userForm: FormGroup;
    
    levelOptions = [
        {
            value: 'admin',
            viewValue: 'Admin'
        },
        {
            value: 'super_admin',
            viewValue: 'Super Admin'
        }
    ]

    constructor(
        private store: Store<IUser[]>,
        public dataService: UserDataService,
        public fb: FormBuilder,
        public dialogRef: MatDialogRef<any>,
        @Inject(MAT_DIALOG_DATA) public data: any,
        public dialog: MatDialog,
        public snackBar: MatSnackBar,
        private loader: LoaderService
    ) {
        this.mode = this.data.mode;

        if(!environment.production)
            console.log("single user data", data);

        this.createForm();

        if (this.mode == 'create') {
            this.userData = 'create';
        } else {
            this.userData = this.data.object;
            this.fillForm(this.data.object);
        }
    }

    createForm() {
        let attr;
        if (this.mode == 'create') {
            attr = {
                '_id': [''],
                'username': ['', Validators.required],
                'email': ['', [Validators.required, Validators.email]],
                'password': ['', Validators.required], // required when create
                'role': ['', Validators.required]
            }
        } else {
            attr = {
                '_id': [''],
                'username': ['', Validators.required],
                'email': ['', [Validators.required, Validators.email]],
                'password': [''], // not required when edit
                'role': ['', Validators.required]
            }
        }
        this.userForm = this.fb.group(attr);
    }

    fillForm(data: any) {
        this.userForm.patchValue({
            '_id': data.id,
            'username': data.username,
            'email': data.email,
            'role': data.role,
        });
    }

    getImageUrl(image: string): string {
        return (image) ? `url(${environment.app.IMAGE_URL}/${image})` : `url('../../../assets/logo.png')`;
        // console.log("image", image);
    }

    changeMode() {
        this.mode = (this.mode == 'show') ? 'edit' : 'show';
    }

    save() {
        // saving
        if (this.userForm.valid) {
            this.loader.display(true);
            // create data
            if (this.mode == 'create') {
                // connection
                this.dataService.create(this.userForm.value)
                    .subscribe(
                    result => {
                        // add user store
                        this.store.dispatch(actionAddUser(result));
                        // return value
                        let r = {
                            status: 'create'
                        }
                        this.loader.display(false);
                        this.dialogRef.close(r);
                    }
                    )
            } else {
                // update data
                // connection
                this.dataService.update(this.userForm.value)
                    .subscribe(
                    result => {
                        // update user store
                        this.store.dispatch(actionUpdateUser(result));
                        // return value
                        let r = {
                            status: 'update'
                        }
                        this.loader.display(false);
                        this.dialogRef.close(r);
                    }
                    )

            }
        }
    }

    delete() {
        let dialogRef = this.dialog.open(AlertDialogComponent, {
            width: '400px',
            data: {
                message: "Delete this user ?"
            }
        });

        dialogRef.afterClosed().subscribe(result => {
            if (result) {
                this.loader.display(true);
                this.dataService.delete(this.userData.id)
                    .subscribe(
                    data => {
                        this.store.dispatch(actionRemoveUser(this.userData.id));
                        let r = {
                            status: 'delete',
                            // data: this.userData
                        }
                        this.loader.display(false);
                        this.dialogRef.close(r);
                    }
                    )
            }
        });
    }

    copyTextToClipboard(text) {
        var txtArea = document.createElement("textarea");

        txtArea.style.position = 'fixed';
        txtArea.style.top = '0';
        txtArea.style.left = '0';
        txtArea.style.opacity = '0';
        txtArea.value = text;
        document.body.appendChild(txtArea);
        txtArea.select();
        try {
            var successful = document.execCommand('copy');
            var msg = successful ? 'successful' : 'unsuccessful';

            if(!environment.production)
                console.log('Copied');
            
            if (successful)
                return true;

        } catch (err) {
            if(!environment.production)
                console.log('Oops, unable to copy');
        }
        document.body.removeChild(txtArea);
        return false;
    }

    copyToClipboard(text: string) {
        console.log(text);
        let result = this.copyTextToClipboard(text);
        if (result) {
            this.snackBar.open('copied to clipboard', null, {
                duration: 2000,
            });
        }
    }

}
