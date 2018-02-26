import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PrintBookkeepingComponent } from './print-bookkeeping.component';

describe('PrintBookkeepingComponent', () => {
  let component: PrintBookkeepingComponent;
  let fixture: ComponentFixture<PrintBookkeepingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PrintBookkeepingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PrintBookkeepingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
