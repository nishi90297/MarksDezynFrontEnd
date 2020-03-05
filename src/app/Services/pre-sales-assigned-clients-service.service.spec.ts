import { TestBed } from '@angular/core/testing';

import { PreSalesAssignedClientsServiceService } from './pre-sales-assigned-clients-service.service';

describe('PreSalesAssignedClientsServiceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PreSalesAssignedClientsServiceService = TestBed.get(PreSalesAssignedClientsServiceService);
    expect(service).toBeTruthy();
  });
});
