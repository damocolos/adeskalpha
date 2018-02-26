import { TestBed, inject } from '@angular/core/testing';

import { FileGalleryDataService } from './file-gallery-data.service';

describe('FileGalleryDataService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [FileGalleryDataService]
    });
  });

  it('should be created', inject([FileGalleryDataService], (service: FileGalleryDataService) => {
    expect(service).toBeTruthy();
  }));
});
