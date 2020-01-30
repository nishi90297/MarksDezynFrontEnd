import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DesignQuotationComponent } from './design-quotation.component';

describe('DesignQuotationComponent', () => {
  let component: DesignQuotationComponent;
  let fixture: ComponentFixture<DesignQuotationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DesignQuotationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DesignQuotationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
