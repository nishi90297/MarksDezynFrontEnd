import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddClientRequirementFormComponent } from './add-client-requirement-form.component';

describe('AddClientRequirementFormComponent', () => {
  let component: AddClientRequirementFormComponent;
  let fixture: ComponentFixture<AddClientRequirementFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddClientRequirementFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddClientRequirementFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
