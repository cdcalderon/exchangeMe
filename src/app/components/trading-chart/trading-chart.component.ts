import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
declare const TradingView: any;
import {
  ChartComponent,
  ApexAxisChartSeries,
  ApexChart,
  ApexXAxis,
  ApexTitleSubtitle,
} from 'ng-apexcharts';

export type ChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  xaxis: ApexXAxis;
  title: ApexTitleSubtitle;
};

@Component({
  selector: 'app-trading-chart',
  templateUrl: './trading-chart.component.html',
  styleUrls: ['./trading-chart.component.scss'],
})
export class TradingChartComponent implements OnInit {
  @ViewChild('chart') chart: ChartComponent;
  public chartOptions: Partial<ChartOptions>;
  constructor() {
    this.chartOptions = {
      series: [
        {
          name: 'My-series',
          data: [10, 41, 35, 51, 49, 62, 69, 91, 148],
        },
      ],
      chart: {
        height: 350,
        type: 'bar',
      },
      title: {
        text: 'My First Angular Chart',
      },
      xaxis: {
        categories: [
          'Jan',
          'Feb',
          'Mar',
          'Apr',
          'May',
          'Jun',
          'Jul',
          'Aug',
          'Sep',
        ],
      },
    };
  }

  ngOnInit(): void {}

  ngAfterViewInit() {
    // new TradingView.widget({
    //   width: '100%',
    //   height: '550px',
    //   symbol: 'BINANCE:BTCUSDT',
    //   theme: 'light',
    //   allow_symbol_change: true,
    //   container_id: 'tradingview_123',
    // });
  }
}
