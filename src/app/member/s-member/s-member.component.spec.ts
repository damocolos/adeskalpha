import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SMemberComponent } from './s-member.component';

describe('SMemberComponent', () => {
  let component: SMemberComponent;
  let fixture: ComponentFixture<SMemberComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SMemberComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SMemberComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
