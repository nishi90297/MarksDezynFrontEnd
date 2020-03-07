import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DesignerMeetingsComponent } from './designer-meetings.component';

describe('DesignerMeetingsComponent', () => {
  let component: DesignerMeetingsComponent;
  let fixture: ComponentFixture<DesignerMeetingsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DesignerMeetingsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DesignerMeetingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
