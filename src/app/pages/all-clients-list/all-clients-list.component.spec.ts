import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AllClientsListComponent } from './all-clients-list.component';

describe('AllClientsListComponent', () => {
  let component: AllClientsListComponent;
  let fixture: ComponentFixture<AllClientsListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AllClientsListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AllClientsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
