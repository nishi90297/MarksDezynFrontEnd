import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminAllClientsComponent } from './admin-all-clients.component';

describe('AdminAllClientsComponent', () => {
  let component: AdminAllClientsComponent;
  let fixture: ComponentFixture<AdminAllClientsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminAllClientsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminAllClientsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
