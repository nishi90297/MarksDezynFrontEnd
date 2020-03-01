import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RequirementFormConfirmationDialogBoxComponent } from './requirement-form-confirmation-dialog-box.component';

describe('RequirementFormConfirmationDialogBoxComponent', () => {
  let component: RequirementFormConfirmationDialogBoxComponent;
  let fixture: ComponentFixture<RequirementFormConfirmationDialogBoxComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RequirementFormConfirmationDialogBoxComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RequirementFormConfirmationDialogBoxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
