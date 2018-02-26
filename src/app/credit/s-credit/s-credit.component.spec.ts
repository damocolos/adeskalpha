import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SCreditComponent } from './s-credit.component';

describe('SCreditComponent', () => {
  let component: SCreditComponent;
  let fixture: ComponentFixture<SCreditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SCreditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SCreditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
