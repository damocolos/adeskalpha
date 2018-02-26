import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SDepositComponent } from './s-deposit.component';

describe('SDepositComponent', () => {
  let component: SDepositComponent;
  let fixture: ComponentFixture<SDepositComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SDepositComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SDepositComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
