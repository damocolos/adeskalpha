import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AllInsuranceComponent } from './all-insurance.component';

describe('AllInsuranceComponent', () => {
  let component: AllInsuranceComponent;
  let fixture: ComponentFixture<AllInsuranceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AllInsuranceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AllInsuranceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
