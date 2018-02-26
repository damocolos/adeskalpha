import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LocPickerComponent } from './loc-picker.component';

describe('LocPickerComponent', () => {
  let component: LocPickerComponent;
  let fixture: ComponentFixture<LocPickerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LocPickerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LocPickerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
