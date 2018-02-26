import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { IMember, selectorMembers } from '@app/member/member.reducer';
import { Store } from '@ngrx/store';
import { AlertDialogComponent } from '@app/shared/alert-dialog/alert-dialog.component';
import { LoaderService } from '@app/loader.service';
import { MemberInputComponent } from '@app/shared/member-input/member-input.component';
import { selectorCredits, ICredit, actionUpdateCredit, actionAddCredit, actionRemoveCredit } from '@app/credit/credit.reducer';

@Component({
    selector: 'anms-s-credit',
    templateUrl: './s-credit.component.html',
    styleUrls: ['./s-credit.component.scss']
})
export class SCreditComponent implements OnInit {

    aForm: FormGroup;
    typeOptions: any = [
        {
            value: 'satu',
            label: 'Satu'
        },
        {
            value: 'dua',
            label: 'Dua'
        }
    ];
    members: IMember[];

    constructor(
        public store: Store <any>,
        public fb: FormBuilder,
        public dialogRef: MatDialogRef < any >,
                @Inject(MAT_DIALOG_DATA) public data: any,
        public dialog: MatDialog,
            public loader: LoaderService,
            ) {
        this.store
            .select(selectorMembers)
            .subscribe(result => {
                this.members = result;
            });
        this.store
            .select(selectorCredits);
        this.createForm();
    }


    ngOnInit() {
        if (this.data)
            this.fillForm();
    }

    createForm() {
        this.aForm = this.fb.group({
            _id: [],
            type: ['satu', Validators.required],
            nik: ['KOOP0001', Validators.required],
            amount: ['1200000', Validators.required],
            status: ['aktif'],
            description: ['description', Validators.required],
            interest: [2, Validators.required],
            time_periods: [5, Validators.required],
            paid: [0],
            repayment_date: [''],
            created_at: [''],
            updated_at: [''],
        })
    }

    fillForm() {
        const data: ICredit = this.data;
        this.aForm.patchValue({
            _id: data._id,
            type: data.type,
            nik: data.nik,
            amount: data.amount,
            status: data.status,
            description: data.description,
            interest: data.interest,
            time_periods: data.time_periods,
            paid: data.paid,
            repayment_date: data.repayment_date,
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
            if (result) {
                this.patchForm({ nik: result.nik });
            }
        });
    }

    save() {
        if (this.aForm.valid) {

            this.patchForm({ updated_at: Date.now() });

            
            if (this.data) { // update
                
                // action api update member
                
                // redux update
                this.store.dispatch(actionUpdateCredit(this.aForm.value));
                this.dialogRef.close();
                
            } else { // create
                
                this.firstCalculate();
                
                this.patchForm({
                    _id: Math.floor(Math.random() * Math.floor(99999)),
                    created_at: Date.now()
                });

                // action api create member

                // redux create
                this.store.dispatch(actionAddCredit(this.aForm.value));
                this.dialogRef.close();

            }
        }
    }

    firstCalculate() {
        let interest: number = this.aForm.get('interest').value;
        let time_periods: number = this.aForm.get('time_periods').value;
        let amount: number = this.aForm.get('amount').value;
        
        let total_interest: number = interest * time_periods;
        // console.log("ti", total_interest);

        let paid: number = amount * total_interest / 100;
        this.patchForm({paid: paid});
        
        // let you_have_pay =  amount - paid;
        // console.log("yhp", you_have_pay);
    }

    delete () {
        let dialogRef = this.dialog.open(AlertDialogComponent, {
            width: '400px',
            data: {
                message: "message.delete.credit"
            }
        });

        dialogRef.afterClosed().subscribe(result => {
            if (result) { // result yes
                // action api delete member

                // redux delete
                this.store.dispatch(actionRemoveCredit(this.data));
                this.dialogRef.close();
            }
        });
    }

}
