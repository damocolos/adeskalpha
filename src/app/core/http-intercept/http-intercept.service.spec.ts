import { TestBed, inject } from '@angular/core/testing';

import { HttpInterceptService } from './http-intercept.service';

describe('HttpInterceptService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [HttpInterceptService]
    });
  });

  it('should be created', inject([HttpInterceptService], (service: HttpInterceptService) => {
    expect(service).toBeTruthy();
  }));
});
