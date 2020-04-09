import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileRequirementFormComponent } from './profile-requirement-form.component';

describe('ProfileRequirementFormComponent', () => {
  let component: ProfileRequirementFormComponent;
  let fixture: ComponentFixture<ProfileRequirementFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProfileRequirementFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfileRequirementFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
