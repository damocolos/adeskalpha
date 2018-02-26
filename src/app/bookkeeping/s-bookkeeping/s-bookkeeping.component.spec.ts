import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SBookkeepingComponent } from './s-bookkeeping.component';

describe('SBookkeepingComponent', () => {
  let component: SBookkeepingComponent;
  let fixture: ComponentFixture<SBookkeepingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SBookkeepingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SBookkeepingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
