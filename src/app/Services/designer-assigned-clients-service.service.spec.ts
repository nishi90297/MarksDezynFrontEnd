import { TestBed } from '@angular/core/testing';

import { DesignerAssignedClientsServiceService } from './designer-assigned-clients-service.service';

describe('DesignerAssignedClientsServiceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: DesignerAssignedClientsServiceService = TestBed.get(DesignerAssignedClientsServiceService);
    expect(service).toBeTruthy();
  });
});
