import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FileGalleryDialogComponent } from './file-gallery-dialog.component';

describe('FileGalleryDialogComponent', () => {
  let component: FileGalleryDialogComponent;
  let fixture: ComponentFixture<FileGalleryDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FileGalleryDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FileGalleryDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
