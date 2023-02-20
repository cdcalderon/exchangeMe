import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InvestipsChartComponent } from './investips-chart.component';

describe('InvestipsChartComponent', () => {
  let component: InvestipsChartComponent;
  let fixture: ComponentFixture<InvestipsChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InvestipsChartComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InvestipsChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
