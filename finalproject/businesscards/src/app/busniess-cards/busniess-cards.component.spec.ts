import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BusniessCardsComponent } from './busniess-cards.component';

describe('BusniessCardsComponent', () => {
  let component: BusniessCardsComponent;
  let fixture: ComponentFixture<BusniessCardsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BusniessCardsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BusniessCardsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
