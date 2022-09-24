import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MarketPairsComponent } from './market-pairs.component';

describe('MarketPairsComponent', () => {
  let component: MarketPairsComponent;
  let fixture: ComponentFixture<MarketPairsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MarketPairsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MarketPairsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
