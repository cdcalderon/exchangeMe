import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MarketTradeComponent } from './market-trade.component';

describe('MarketTradeComponent', () => {
  let component: MarketTradeComponent;
  let fixture: ComponentFixture<MarketTradeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MarketTradeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MarketTradeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
