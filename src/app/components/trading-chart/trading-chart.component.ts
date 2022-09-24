import { Component, OnInit, AfterViewInit } from '@angular/core';
declare const TradingView: any;
@Component({
  selector: 'app-trading-chart',
  templateUrl: './trading-chart.component.html',
  styleUrls: ['./trading-chart.component.scss'],
})
export class TradingChartComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}

  ngAfterViewInit() {
    new TradingView.widget({
      width: '100%',
      height: '550px',
      symbol: 'BINANCE:BTCUSDT',
      theme: 'light',
      allow_symbol_change: true,
      container_id: 'tradingview_123',
    });
  }
}
