import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OnBoardClientsComponent } from './on-board-clients.component';

describe('OnBoardClientsComponent', () => {
  let component: OnBoardClientsComponent;
  let fixture: ComponentFixture<OnBoardClientsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OnBoardClientsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OnBoardClientsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
