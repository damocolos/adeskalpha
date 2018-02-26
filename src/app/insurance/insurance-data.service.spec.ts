import { TestBed, inject } from '@angular/core/testing';

import { InsuranceDataService } from './insurance-data.service';

describe('InsuranceDataService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [InsuranceDataService]
    });
  });

  it('should be created', inject([InsuranceDataService], (service: InsuranceDataService) => {
    expect(service).toBeTruthy();
  }));
});
