import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewBusniessCardComponent } from './new-busniess-card.component';

describe('NewBusniessCardComponent', () => {
  let component: NewBusniessCardComponent;
  let fixture: ComponentFixture<NewBusniessCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewBusniessCardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewBusniessCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
