import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

// NgRx
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { environment } from 'src/environments/environment';
import { appReducers } from './store/app.reducer';
import { MarketPairsComponent } from './components/market-pairs/market-pairs.component';
import { ExchangeComponent } from './pages/exchange/exchange.component';
import { TradingChartComponent } from './components/trading-chart/trading-chart.component';
import { MarketTradeComponent } from './components/market-trade/market-trade.component';
import { HistoryOrderComponent } from './components/history-order/history-order.component';
import { OrderBookComponent } from './components/order-book/order-book.component';
import { MarketHistoryComponent } from './components/market-history/market-history.component';
import { HeaderComponent } from './components/header/header.component';
import { FormsModule } from '@angular/forms';
import { NgApexchartsModule } from 'ng-apexcharts';

@NgModule({
  declarations: [
    HeaderComponent,
    AppComponent,
    MarketPairsComponent,
    ExchangeComponent,
    TradingChartComponent,
    MarketTradeComponent,
    HistoryOrderComponent,
    OrderBookComponent,
    MarketHistoryComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    StoreModule.forRoot(appReducers),
    StoreDevtoolsModule.instrument({
      maxAge: 25, // Retains last 25 states
      logOnly: environment.production, // Restrict extension to log-only mode
      autoPause: true, // Pauses recording actions and state changes when the extension window is not open
    }),
    NgApexchartsModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
