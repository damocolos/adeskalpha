import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subject } from 'rxjs/Subject';
import { takeUntil } from 'rxjs/operators/takeUntil';
import { MatSnackBar } from '@angular/material';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { ANIMATE_ON_ROUTE_ENTER } from '@app/core';
import { HttpClient } from '@angular/common/http';

@Component({
    selector: 'anms-form-standard',
    templateUrl: './standard.component.html',
    styleUrls: ['./standard.component.scss']
})
export class StandardComponent implements OnInit, OnDestroy {
    private unsubscribe$: Subject<void> = new Subject<void>();

    animateOnRouteEnter = ANIMATE_ON_ROUTE_ENTER;
    todos: any;
    newTodo = '';
    formGroup: FormGroup;

    constructor(
        public store: Store<any>, 
        public snackBar: MatSnackBar,
        private http: HttpClient,
        public fb: FormBuilder) {
            this.createForm();
        }

    ngOnInit() {
        // this.store
        //   .select(selectorTodos)
        //   .pipe(takeUntil(this.unsubscribe$))
        //   .subscribe(todos => {
        //     this.todos = todos;
        //     this.store.dispatch(actionPersistTodos(todos));
        //   });
    }

    ngOnDestroy(): void {
        this.unsubscribe$.next();
        this.unsubscribe$.complete();
    }

    createForm() {
        this.formGroup = this.fb.group({
            'title': [],
            'image': [],
            'imageFile': []
        });
    }

    submit() {
        console.log("form", this.formGroup.value);
        // test upload file
        this.http.post('http://localhost:3000/api/articles', this.prepareSave())
        // .map(res => res.json())
        .subscribe(
            data => {
                console.log("result post", data);
            }, err => {
                console.log("err", err);
            }
        )
    }

    prepareSave(): any {
        let fd = new FormData();
        fd.append('title', this.formGroup.get('title').value);
        fd.append('image', this.formGroup.get('image').value);
        if (this.formGroup.get('imageFile').value != null) {
            const newValue = this.formGroup.get('imageFile').value.files[0];
            fd.append('imageFile', newValue, newValue.name);
        }
        return fd;
    }

    onSnackBar(message: string, action: string) {
        this.snackBar.open(message, action, {
            duration: 2000,
        });
    }
}
