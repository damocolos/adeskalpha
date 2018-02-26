import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SingleInsuranceComponent } from './single-insurance.component';

describe('SingleInsuranceComponent', () => {
  let component: SingleInsuranceComponent;
  let fixture: ComponentFixture<SingleInsuranceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SingleInsuranceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SingleInsuranceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
