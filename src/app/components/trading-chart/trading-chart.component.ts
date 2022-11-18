import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import * as fromStore from 'src/app/store/app.reducer';
declare const TradingView: any;
import {
  ChartComponent,
  ApexAxisChartSeries,
  ApexChart,
  ApexYAxis,
  ApexXAxis,
  ApexTitleSubtitle,
} from 'ng-apexcharts';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

export type ChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  xaxis: ApexXAxis;
  yaxis: ApexYAxis;
  title: ApexTitleSubtitle;
};
import { options, defaultSeries } from './price-chart.config';

@Component({
  selector: 'app-trading-chart',
  templateUrl: './trading-chart.component.html',
  styleUrls: ['./trading-chart.component.scss'],
})
export class TradingChartComponent implements OnInit {
  priceChart$: Observable<any>; // TODO: create interfaces
  chartMode: string;
  @ViewChild('chart') chart: ChartComponent;
  public chartOptions: Partial<ChartOptions>;
  options = null;
  constructor(private store: Store<fromStore.AppState>) {
    this.options = options;
  }

  ngOnInit(): void {
    this.priceChart$ = this.store.select(fromStore.priceChartSelector);
    this.store
      .select(fromStore.getChartModeSelector)
      .subscribe((cm) => (this.chartMode = cm));
  }

  ngAfterViewInit() {
    new TradingView.widget({
      width: '100%',
      height: '532px',
      symbol: 'BINANCE:BTCUSDT',
      theme: 'light',
      allow_symbol_change: true,
      container_id: 'tradingview_123',
    });
  }
}
