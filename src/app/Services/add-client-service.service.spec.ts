import { TestBed } from '@angular/core/testing';

import { AddClientServiceService } from './add-client-service.service';

describe('AddClientServiceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AddClientServiceService = TestBed.get(AddClientServiceService);
    expect(service).toBeTruthy();
  });
});
