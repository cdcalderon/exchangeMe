import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { combineLatest, Observable, take } from 'rxjs';
import { ExchangeService } from 'src/app/shared/services/exchange.service';
import { EventAggregator } from 'src/app/shared/services/helpers/event-aggregator';
import * as fromStore from 'src/app/store/app.reducer';

@Component({
  selector: 'app-history-order',
  templateUrl: './history-order.component.html',
  styleUrls: ['./history-order.component.scss'],
})
export class HistoryOrderComponent implements OnInit {
  myOpenOrders$: Observable<any>; // TODO: create interfaces
  myFilledOrders$: Observable<any>; // TODO: create interfaces
  symbols$: Observable<string[]>;
  constructor(
    private store: Store<fromStore.AppState>,
    private exchangeService: ExchangeService,
    private eventAggregator: EventAggregator
  ) {}

  ngOnInit(): void {
    this.symbols$ = this.store.select(fromStore.getSymbolsSelector);
    this.myOpenOrders$ = this.store.select(fromStore.myOpenOrdersSelector);
    this.myFilledOrders$ = this.store.select(fromStore.myFilledOrdersSelector);
  }

  cancelOrder(order) {
    const exchange$ = this.eventAggregator.exchange;
    const provider$ = this.eventAggregator.providerConnection;

    combineLatest([provider$, exchange$])
      .pipe(take(1))
      .subscribe((result) => {
        this.exchangeService.cancelOrder(result[0], result[1], order);
      });
  }
}
