import { TestBed } from '@angular/core/testing';

import { DesignQuotationServiceService } from './design-quotation-service.service';

describe('DesignQuotationServiceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: DesignQuotationServiceService = TestBed.get(DesignQuotationServiceService);
    expect(service).toBeTruthy();
  });
});
