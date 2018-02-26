import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { IMember, selectorMembers } from '@app/member/member.reducer';
import { Store } from '@ngrx/store';
import { AlertDialogComponent } from '@app/shared/alert-dialog/alert-dialog.component';
import { LoaderService } from '@app/loader.service';
import { selectorDeposits, IDeposit, actionUpdateDeposit, actionAddDeposit, actionRemoveDeposit } from '@app/deposit/deposit.reducer';
import { MemberInputComponent } from '@app/shared/member-input/member-input.component';

@Component({
    selector: 'anms-s-deposit',
    templateUrl: './s-deposit.component.html',
    styleUrls: ['./s-deposit.component.scss']
})
export class SDepositComponent implements OnInit {

    aForm: FormGroup;
    typeOptions: any = [
        {
            value: 'wajib',
            label: 'Wajib'
        },
        {
            value: 'sukarela',
            label: 'Sukarela'
        }
    ];
    members: IMember[];

    constructor(
        public store: Store < IMember[] >,
        public fb: FormBuilder,
        public dialogRef: MatDialogRef < any >,
            @Inject(MAT_DIALOG_DATA) public data: any,
        public dialog: MatDialog,
            public loader: LoaderService,
        ) {
        this.store
            .select(selectorMembers)
            .subscribe( result => {
                this.members = result;
            });
        this.store
            .select(selectorDeposits);
        this.createForm();
    }


    ngOnInit() {
        if (this.data)
            this.fillForm();
    }

    createForm() {
        this.aForm = this.fb.group({
            _id: [],
            type: ['sukarela', Validators.required],
            nik: ['KOOP0001', Validators.required],
            amount: ['1200000', Validators.required],
            description: ['desc', Validators.required],
            created_at: [''],
            updated_at: [''],
        })
    }

    fillForm() {
        const data: IDeposit = this.data;
        this.aForm.patchValue({
            _id: data._id,
            type: data.type,
            nik: data.nik,
            amount: data.amount,
            description: data.description,
            created_at: data.created_at,
            updated_at: data.update_at
        })
    }

    patchForm(data: any) {
        this.aForm.patchValue(data);
    }

    pickMember() {
        let dialogRef = this.dialog.open(MemberInputComponent, {
            width: '900px',
            height: '600px'
        });

        dialogRef.afterClosed().subscribe(result => {
            // check result
            if(result) {
                this.patchForm({nik: result.nik});
            }
        });
    }

    save() {
        if (this.aForm.valid) {

            this.patchForm({ updated_at: Date.now() });

            if (this.data) { // update

                // action api update member

                // redux update
                this.store.dispatch(actionUpdateDeposit(this.aForm.value));
                this.dialogRef.close();

            } else { // create

                this.patchForm({
                    _id: Math.floor(Math.random() * Math.floor(99999)),
                    created_at: Date.now()
                });

                // action api create member

                // redux create
                this.store.dispatch(actionAddDeposit(this.aForm.value));
                this.dialogRef.close();

            }
        }
    }

    delete () {
        let dialogRef = this.dialog.open(AlertDialogComponent, {
            width: '400px',
            data: {
                message: "message.delete.deposit"
            }
        });

        dialogRef.afterClosed().subscribe(result => {
            if (result) { // result yes
                // action api delete member

                // redux delete
                this.store.dispatch(actionRemoveDeposit(this.data));
                this.dialogRef.close();
            }
        });
    }

}
