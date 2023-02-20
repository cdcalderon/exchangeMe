import {
  Component,
  Input,
  OnInit,
  OnDestroy,
  ViewChild,
  SimpleChanges,
} from '@angular/core';
import { Observable } from 'rxjs';
import {
  widget,
  IChartingLibraryWidget,
  ChartingLibraryWidgetOptions,
  LanguageCode,
  ResolutionString,
} from '../../../assets/charting_library';

import {
  ChartComponent,
  ApexAxisChartSeries,
  ApexChart,
  ApexYAxis,
  ApexXAxis,
  ApexTitleSubtitle,
} from 'ng-apexcharts';

import { options, defaultSeries } from '../trading-chart/price-chart.config';

import { ChartOptions } from '../trading-chart/trading-chart.component';
import * as fromStore from 'src/app/store/app.reducer';
import { Store } from '@ngrx/store';
import { IZigZagFiboSignal } from 'src/app/shared/models/zigzag-fibo-signal';
import { environment } from '../../../environments/environment';
import { ISignal } from 'src/app/shared/models/ISignal';

@Component({
  selector: 'app-tv-chart-container',
  templateUrl: './tv-chart-container.component.html',
  styleUrls: ['./tv-chart-container.component.css'],
})
export class TvChartContainerComponent implements OnInit, OnDestroy {
  priceChart$: Observable<any>; // TODO: create interfaces
  chartMode: string;
  @ViewChild('chart') chart: ChartComponent;
  public chartOptions: Partial<ChartOptions>;
  options = null;
  constructor(private store: Store<fromStore.AppState>) {
    this.options = options;
  }
  studyIds: any[] = [];
  @Input() selectedSignal: ISignal;

  private _symbol: ChartingLibraryWidgetOptions['symbol'] = 'AAPL';
  private _interval: ChartingLibraryWidgetOptions['interval'] =
    'D' as ResolutionString;
  // BEWARE: no trailing slash is expected in feed URL
  //private _datafeedUrl = 'https://demo_feed.tradingview.com';
  private _datafeedUrl = environment.udfApiBaseUrl + '/api/udf';
  private _libraryPath: ChartingLibraryWidgetOptions['library_path'] =
    '/assets/charting_library/';
  private _chartsStorageUrl: ChartingLibraryWidgetOptions['charts_storage_url'] =
    'https://saveload.tradingview.com';
  private _chartsStorageApiVersion: ChartingLibraryWidgetOptions['charts_storage_api_version'] =
    '1.1';
  private _clientId: ChartingLibraryWidgetOptions['client_id'] =
    'tradingview.com';
  private _userId: ChartingLibraryWidgetOptions['user_id'] = 'public_user_id';
  private _fullscreen: ChartingLibraryWidgetOptions['fullscreen'] = false;
  private _autosize: ChartingLibraryWidgetOptions['autosize'] = true;
  private _containerId: ChartingLibraryWidgetOptions['container'] =
    'tv_chart_container';
  private _tvWidget: IChartingLibraryWidget | null = null;
  private _theme: ChartingLibraryWidgetOptions['theme'] = 'Dark';

  @Input()
  set isDarkActive(isDarkActive: boolean) {
    this._theme = isDarkActive ? 'Dark' : 'Light';
  }

  @Input()
  set symbol(symbol: ChartingLibraryWidgetOptions['symbol']) {
    this._symbol = symbol || this._symbol;
  }

  @Input()
  set interval(interval: ChartingLibraryWidgetOptions['interval']) {
    this._interval = interval || this._interval;
  }

  @Input()
  set datafeedUrl(datafeedUrl: string) {
    this._datafeedUrl = datafeedUrl || this._datafeedUrl;
  }

  @Input()
  set libraryPath(libraryPath: ChartingLibraryWidgetOptions['library_path']) {
    this._libraryPath = libraryPath || this._libraryPath;
  }

  @Input()
  set chartsStorageUrl(
    chartsStorageUrl: ChartingLibraryWidgetOptions['charts_storage_url']
  ) {
    this._chartsStorageUrl = chartsStorageUrl || this._chartsStorageUrl;
  }

  @Input()
  set chartsStorageApiVersion(
    chartsStorageApiVersion: ChartingLibraryWidgetOptions['charts_storage_api_version']
  ) {
    this._chartsStorageApiVersion =
      chartsStorageApiVersion || this._chartsStorageApiVersion;
  }

  @Input()
  set clientId(clientId: ChartingLibraryWidgetOptions['client_id']) {
    this._clientId = clientId || this._clientId;
  }

  @Input()
  set userId(userId: ChartingLibraryWidgetOptions['user_id']) {
    this._userId = userId || this._userId;
  }

  @Input()
  set fullscreen(fullscreen: ChartingLibraryWidgetOptions['fullscreen']) {
    this._fullscreen = fullscreen || this._fullscreen;
  }

  @Input()
  set autosize(autosize: ChartingLibraryWidgetOptions['autosize']) {
    this._autosize = autosize || this._autosize;
  }

  @Input()
  set theme(autosize: ChartingLibraryWidgetOptions['autosize']) {
    this._autosize = autosize || this._autosize;
  }

  @Input()
  set containerId(theme: ChartingLibraryWidgetOptions['theme']) {
    this._theme = theme || this._theme;
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes && changes['selectedSignal'] && this._tvWidget) {
      this.handleZigZagSignal(changes['selectedSignal'].currentValue);
    }
  }

  ngOnInit() {
    this.priceChart$ = this.store.select(fromStore.priceChartSelector);
    this.store
      .select(fromStore.getChartModeSelector)
      .subscribe((cm) => (this.chartMode = cm));

    function getLanguageFromURL(): LanguageCode | null {
      const regex = new RegExp('[\\?&]lang=([^&#]*)');
      const results = regex.exec(location.search);

      return results === null
        ? null
        : (decodeURIComponent(results[1].replace(/\+/g, ' ')) as LanguageCode);
    }

    const widgetOptions: ChartingLibraryWidgetOptions = {
      symbol: this._symbol,
      datafeed: new (window as any).Datafeeds.UDFCompatibleDatafeed(
        this._datafeedUrl
      ),
      interval: this._interval,
      container: this._containerId,
      library_path: this._libraryPath,
      locale: getLanguageFromURL() || 'en',
      disabled_features: ['use_localstorage_for_settings'],
      enabled_features: ['study_templates'],
      charts_storage_url: this._chartsStorageUrl,
      charts_storage_api_version: this._chartsStorageApiVersion,
      client_id: this._clientId,
      user_id: this._userId,
      fullscreen: this._fullscreen,
      autosize: this._autosize,
      theme: this._theme,
    };

    const tvWidget = new widget(widgetOptions);
    this._tvWidget = tvWidget;

    tvWidget.onChartReady(() => {
      //this.drawTempDemoElements(this._tvWidget); // TODO: add conditional display; data
      this.onCreateStudy(this._tvWidget, 'stoch307bull');
    });
  }

  private createNote(
    message: string,
    time: number,
    price: number,
    backgroundColor: string = '#fffece'
  ) {
    if (this._tvWidget) {
      this._tvWidget.chart().createMultipointShape([{ time, price }], {
        shape: 'note',
        disableSave: true,
        text: message,
        overrides: {
          // backgroundColor: backgroundColor,
          showLabel: true,
          fontSize: 16,
          linewidth: 2,
          linecolor: '#00000',
          markerColor: '#3F7D41',
        },
      });
    }
  }

  private createBallon(
    message: string,
    time: number,
    price: number,
    backgroundColor: string = '#fffece'
  ) {
    if (this._tvWidget) {
      this._tvWidget.chart().createMultipointShape([{ time, price }], {
        shape: 'balloon',
        lock: false,
        disableSelection: true,
        disableSave: true,
        disableUndo: true,
        overrides: {
          backgroundColor: backgroundColor,
          showLabel: true,
          fontSize: 30,
          linewidth: 2,
          linecolor: '#00FFFF',
        },
      });
    }
  }

  private createFlag(time: number, price: number) {
    this._tvWidget.chart().createShape(
      {
        time: time,
        price: price,
      },
      {
        shape: 'flag',
        zOrder: 'top',
        lock: true,
        disableSelection: true,
        disableSave: true,
        disableUndo: true,
        text: 'Hello Carlos',
        overrides: {
          color: 'red',
          fontsize: 12,
        },
      }
    );
  }

  private createText(time: number, price: number) {
    this._tvWidget.chart().createShape(
      {
        time: time,
        price: price,
      },
      {
        shape: 'anchored_text',
        zOrder: 'top',
        lock: true,
        disableSelection: true,
        disableSave: true,
        disableUndo: true,
        text: 'Carlos Side Project Demo',
        overrides: {
          color: 'green',
          fontsize: 20,
        },
      }
    );
  }

  private createTrendLine(
    pointA: number,
    pointB: number,
    pointAPrice: number,
    pointBPrice: number,
    lineColor: string
  ) {
    if (this._tvWidget) {
      this._tvWidget.chart().createMultipointShape(
        [
          { time: pointA, price: pointAPrice },
          { time: pointB, price: pointBPrice },
        ],
        {
          shape: 'trend_line',
          lock: true,
          disableSelection: true,
          disableSave: true,
          disableUndo: true,
          overrides: {
            showLabel: true,
            fontSize: 30,
            linewidth: 4,
            linecolor: lineColor,
          },
        }
      );
    }
  }

  private getNumberDateTime(date: string): number {
    return new Date(date).valueOf() / 1000;
  }

  private onCreateStudy(widget, marksType) {
    if (marksType === 'stoch307bull') {
      widget
        .chart()
        .createStudy('Stochastic', false, false, [14, 5, 5], null, {
          '%d.color': '#E3FFCA',
          '%k.color': '#00FF00',
        })
        .then((id) => {
          this.studyIds.push(id);
        });

      widget
        .chart()
        .createStudy('Moving Average', false, true, [7], {
          'plot.color.0': '#44bcd8',
        })
        .then((id) => {
          this.studyIds.push(id);
        });

      widget
        .chart()
        .createStudy('Moving Average', false, true, [13], {
          'plot.color.0': '#e07b39',
        })
        .then((id) => {
          this.studyIds.push(id);
        });

      widget
        .chart()
        .createStudy('Choppiness Index', false, true, [14], {
          'plot.color.0': '#44bcd8',
        })
        .then((id) => {
          this.studyIds.push(id);
        });

      widget
        .chart()
        .createStudy('Bollinger Bands', false, true, [20], {
          'plot.color.0': '#44bcd8',
        })
        .then((id) => {
          this.studyIds.push(id);
        });
    } else {
      widget.chart().createStudy('Stochastic', false, false, [14, 5, 5], null, {
        '%d.color': '#E3FFCA',
        '%k.color': '#00FF00',
      });

      widget
        .chart()
        .createStudy('MACD', false, false, [8, 17, 'close', 9], null, {
          'macd.color': '#00FF00',
          'signal.color': '#fffa00',
          'histogram.color': '#00F9FF',
        });

      widget.chart().createStudy(
        'Moving Average',
        false,
        true,
        [10],
        function (guid) {
          console.log(guid);
        },
        { 'plot.color.0': '#fffa00' }
      );
    }
  }

  private oneWeekAfterUTC(date: number) {
    const oneMonthAfter = Math.floor(date + 1 * 4 * 24 * 60 * 60);

    return oneMonthAfter;
  }

  private sixMonthsBeforeUTC(date: number) {
    const oneMonthAfter = Math.floor(date - 6 * 30 * 24 * 60 * 60);

    return oneMonthAfter;
  }

  private oneMonthAfterUTC(date: number) {
    const oneMonthAfter = Math.floor(date + 1 * 30 * 24 * 60 * 60);

    return oneMonthAfter;
  }

  private drawTempDemoElements(tvWidget: IChartingLibraryWidget) {
    const baseDate = new Date('Dec/01/2017');
    const year = baseDate.getFullYear();
    const month = baseDate.getMonth();
    const day = baseDate.getDate();
    const signalDate = Date.UTC(year, month, day) / 1000;
    const pointA = signalDate;
    const pointB = this.sixMonthsBeforeUTC(pointA);

    this.createText(this.getNumberDateTime('Jan/10/2018'), 183);
    this.createTrendLine(pointA, pointB, 180, 152, '#F15152');
    this.createFlag(this.getNumberDateTime('Dec/01/2017'), 183);
    this.createBallon(
      "Sorry I'm still working on this tradingview integration, you can use the chart widget in the meantime",
      this.getNumberDateTime('Dec/01/2017'),
      177,
      '#2ef03a'
    );

    tvWidget.headerReady().then(() => {
      this.createNote(
        `Hello this is a Message form Carlos Calderon: Sorry I'm still working on this tradingview integration, you can use the chart widget in the meantime 👆🏻`,
        this.getNumberDateTime('Jan/01/2018'),
        177,
        '#2ef03a'
      );
      tvWidget.chart().createStudy('Moving Average', false, true);

      const button = tvWidget.createButton();
      button.setAttribute('title', 'Click to show a notification popup');
      button.classList.add('apply-common-tooltip');
      button.addEventListener('click', () =>
        tvWidget.showNoticeDialog({
          title: 'Notification',
          body: 'TradingView Charting Library API works correctly',
          callback: () => {
            console.log('Noticed!');
          },
        })
      );
      button.innerHTML = 'Check API';
    });
  }

  private handleZigZagSignal(selectedZigZagSignal: IZigZagFiboSignal) {
    if (selectedZigZagSignal && this._tvWidget) {
      this.clearChart();
      console.log('Changes from tv chart container ' + selectedZigZagSignal);
      const base = this.getUTCUnixDate(selectedZigZagSignal.activationDate);
      const from = this.twoMonthsBeforeUTC(base);
      const to = this.oneMonthAfterUTC(base);

      const currentSymbol = this._tvWidget
        .activeChart()
        .symbol()
        .split(':')
        .pop();
      this.onCreateStudy(this._tvWidget, 'stoch307bull');
      if (selectedZigZagSignal.symbol === currentSymbol) {
        this._tvWidget
          .activeChart()
          .setVisibleRange({ from, to }, { percentRightMargin: 20 })
          .then(() => {
            console.log('New visible range is applied');
            this.addZigZagFiboSignal(selectedZigZagSignal);
          });
      } else {
        this._tvWidget
          .activeChart()
          .setSymbol(selectedZigZagSignal.symbol, () => {
            this._tvWidget
              .activeChart()
              .setVisibleRange({ from, to }, { percentRightMargin: 20 })
              .then(() => {
                console.log('New visible range is applied');
                this.addZigZagFiboSignal(selectedZigZagSignal);
              });
          });
      }
    }
  }

  private clearChart() {
    if (this._tvWidget && this._tvWidget.chart) {
      this._tvWidget.chart().removeAllShapes();
      this.studyIds.forEach((id) => {
        this._tvWidget.activeChart().removeEntity(id);
      });
      //this._tvWidget.activeChart().getAllStudies().forEach(({ name, id }) => this._tvWidget.activeChart().removeEntity(id));
      //this._tvWidget.activeChart().removeAllStudies();
    }
  }

  private getUTCUnixDate(date: Date) {
    const baseDate = new Date(date);
    const year = baseDate.getFullYear();
    const month = baseDate.getMonth();
    const day = baseDate.getDate();
    return Date.UTC(year, month, day) / 1000;
  }

  private twoMonthsBeforeUTC(date: number) {
    const oneMonthAfter = Math.floor(date - 2 * 30 * 24 * 60 * 60);

    return oneMonthAfter;
  }

  private twoWeekAfterUTC(date: number) {
    const oneMonthAfter = Math.floor(date + 2 * 7 * 24 * 60 * 60);

    return oneMonthAfter;
  }

  private addZigZagFiboSignal(signal: IZigZagFiboSignal) {
    if (this._tvWidget) {
      this._tvWidget.chart().removeAllShapes();
    }

    const baseDate = new Date(signal.activationDate);
    const year = baseDate.getFullYear();
    const month = baseDate.getMonth();
    const day = baseDate.getDate();
    const signalDate = Date.UTC(year, month, day) / 1000;
    const pointA = signalDate;

    const pointB = this.twoWeekAfterUTC(pointA);

    if (signal.activationDirection === 'UP') {
      //const support = Math.min(signal.cLow, signal.cLowestOpenOrClose);
      const support = signal.support;
      this.createTrendLine(pointA, pointB, support, support, '#3073d1');
      // this.createTrendLine(pointA, pointB, signal.currentWeekFibSupport, signal.currentWeekFibSupport, '#00FFFF');

      // this.createTrendLine(pointA, pointB, signal.ironCondorUpLeg, signal.ironCondorUpLeg, '#00FFFF');

      // this.createCalloutSignalUp
      //     (`Buy Credit Put Spread at ${support} ${month + 1}-${day}-${year}`,
      //         pointA, support, '#2ef03a');

      //this.fibTrendExtABC(signal.aLow, signal.bHigh, signal.cLowestOpenOrClose, signal.aDate, signal.bDate, signal.cDate);
      this.fibTrendExtABC(
        signal.aLow,
        signal.bHigh,
        signal.cLow,
        signal.aDate,
        signal.bDate,
        signal.cDate
      );

      // this.createCalloutSignalDown
      //     (`Buy Credit Call Spread at ${signal.ironCondorUpLeg} ${month + 1}-${day}-${year}`,
      //         pointA, signal.ironCondorUpLeg, '#2ef03a');
    } else if (signal.activationDirection === 'DOWN') {
      //const resistence = Math.max(signal.cHigh, signal.cHighestOpenOrClose);
      const resistence = signal.resistence;
      this.createTrendLine(pointA, pointB, resistence, resistence, '#1c100b');
      //this.createTrendLine(pointA, pointB, signal.currentWeekFibResistence, signal.currentWeekFibResistence, '#00FFFF');

      //this.createTrendLine(pointA, pointB, signal.ironCondorDownLeg, signal.ironCondorDownLeg, '#00FFFF');

      // this.createCalloutSignalDown
      //     (`Buy Credit Call Spread at ${resistence} ${month + 1}-${day}-${year}`,
      //         pointA, resistence, '#2ef03a');

      //this.fibTrendExtABC(signal.aHigh, signal.bLow, signal.cHighestOpenOrClose, signal.aDate, signal.bDate, signal.cDate);
      this.fibTrendExtABC(
        signal.aHigh,
        signal.bLow,
        signal.cHigh,
        signal.aDate,
        signal.bDate,
        signal.cDate
      );
      // this.createCalloutSignalUp
      //     (`Buy Credit Put Spread at ${signal.ironCondorDownLeg} ${month + 1}-${day}-${year}`,
      //         pointA, signal.ironCondorDownLeg, '#2ef03a');
    }
  }

  private fibTrendExtABC(
    aPrice: number,
    bPrice: number,
    cPrice: number,
    aDate: Date,
    bDate: Date,
    cDate: Date
  ) {
    if (this._tvWidget) {
      this._tvWidget.chart().createMultipointShape(
        [
          { time: this.getNumberDateTime(aDate.toString()), price: aPrice },
          { time: this.getNumberDateTime(bDate.toString()), price: bPrice },
          { time: this.getNumberDateTime(cDate.toString()), price: cPrice },
        ],
        {
          shape: 'fib_trend_ext',
          lock: false,
          disableSelection: false,
          disableSave: true,
          disableUndo: true,
          overrides: {
            'trendline.visible': false,
            'level10.visible': false,
            'level9.visible': false,
            'level11.visible': false,
            'level1.visible': false,
            'level2.visible': false,
            transparency: 95,
            extendLines: 'true',
            showCoeffs: true,
          },
        }
      );
    }
  }

  ngOnDestroy() {
    if (this._tvWidget !== null) {
      this._tvWidget.remove();
      this._tvWidget = null;
    }
  }
}
