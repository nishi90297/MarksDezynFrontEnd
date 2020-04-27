import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddClientBarComponent } from './add-client-bar.component';

describe('AddClientBarComponent', () => {
  let component: AddClientBarComponent;
  let fixture: ComponentFixture<AddClientBarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddClientBarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddClientBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
