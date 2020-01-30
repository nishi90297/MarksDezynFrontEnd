import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddClientDesignQuotationComponent } from './add-client-design-quotation.component';

describe('AddClientDesignQuotationComponent', () => {
  let component: AddClientDesignQuotationComponent;
  let fixture: ComponentFixture<AddClientDesignQuotationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddClientDesignQuotationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddClientDesignQuotationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
