import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subject } from 'rxjs/Subject';
import { takeUntil } from 'rxjs/operators/takeUntil';

import { ANIMATE_ON_ROUTE_ENTER } from '@app/core';

@Component({
  selector: 'anms-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent implements OnInit, OnDestroy {
  private unsubscribe$: Subject<void> = new Subject<void>();

  animateOnRouteEnter = ANIMATE_ON_ROUTE_ENTER;
  todos: any;
  newTodo = '';

  constructor(public store: Store<any>) {}

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
}
