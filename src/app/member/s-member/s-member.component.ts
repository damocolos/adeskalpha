import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { IMember, selectorMembers, actionUpdateMember, actionAddMember, actionRemoveMember } from '@app/member/member.reducer';
import { Store } from '@ngrx/store';
import { AlertDialogComponent } from '@app/shared/alert-dialog/alert-dialog.component';
import { LoaderService } from '@app/loader.service';

@Component({
    selector: 'anms-s-member',
    templateUrl: './s-member.component.html',
    styleUrls: ['./s-member.component.scss']
})
export class SMemberComponent implements OnInit {

    aForm: FormGroup;
    genderOptions: any = [
        {
            value: 'L',
            label: 'Laki-laki'
        },
        {
            value: 'P',
            label: 'Perempuan'
        }
    ]

    constructor(
        public store: Store<IMember[]>,
        public fb: FormBuilder,
        public dialogRef: MatDialogRef<any>,
        @Inject(MAT_DIALOG_DATA) public data: any,
        public dialog: MatDialog,
        public loader: LoaderService,
    ) {
        this.store.select(selectorMembers);
        this.createForm();
    }


    ngOnInit() {
        if (this.data)
            this.fillForm();
    }

    createForm() {
        this.aForm = this.fb.group({
            _id: [],
            nik: ['KOP11001', Validators.required],
            name: ['Wawan', Validators.required],
            email: ['wawan@koperasi.com', Validators.required],
            gender: ['L', Validators.required],
            birth_date: ['', Validators.required],
            address: ['jl ir soekarno no 50', Validators.required],
            city: ['Sukoharjo', Validators.required],
            last_salary: ['1600000', Validators.required],
            salary_date: ['', Validators.required],
            out_date: [''],
            created_at: [''],
            updated_at: [''],
        })
    }

    fillForm() {
        const data: IMember = this.data;
        this.aForm.patchValue({
            _id: data._id,
            nik: data.nik,
            name: data.name,
            email: data.email,
            gender: data.gender,
            birth_date: data.birth_date,
            address: data.address,
            city: data.city,
            last_salary: data.last_salary,
            salary_date: data.salary_date,
            out_date: data.out_date,
            created_at: data.created_at,
            updated_at: data.update_at
        })
    }

    patchForm(data: any) {
        this.aForm.patchValue(data);
    }

    save() {
        if(this.aForm.valid) {

            this.patchForm({ updated_at: Date.now() });

            if(this.data) { // update

                // action api update member

                // redux update
                this.store.dispatch(actionUpdateMember(this.aForm.value));
                this.dialogRef.close();

            } else { // create

                this.patchForm({
                    _id: Math.floor(Math.random() * Math.floor(99999)),
                    created_at: Date.now()
                });

                // action api create member

                // redux create
                this.store.dispatch(actionAddMember(this.aForm.value));
                this.dialogRef.close();

            }
        }
    }

    delete() {
        let dialogRef = this.dialog.open(AlertDialogComponent, {
            width: '400px',
            data: {
                message: "message.delete.member"
            }
        });

        dialogRef.afterClosed().subscribe(result => {
            if (result) { // result yes
                // action api delete member

                // redux delete
                this.store.dispatch(actionRemoveMember(this.data));
                this.dialogRef.close();
            }
        });
    }

}
