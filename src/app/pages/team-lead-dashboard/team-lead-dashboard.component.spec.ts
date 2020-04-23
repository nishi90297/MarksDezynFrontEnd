import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TeamLeadDashboardComponent } from './team-lead-dashboard.component';

describe('TeamLeadDashboardComponent', () => {
  let component: TeamLeadDashboardComponent;
  let fixture: ComponentFixture<TeamLeadDashboardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TeamLeadDashboardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TeamLeadDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
