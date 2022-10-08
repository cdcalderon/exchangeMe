import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { combineLatest, Observable, take } from 'rxjs';
import { ExchangeService } from 'src/app/shared/services/exchange.service';
import { EventAggregator } from 'src/app/shared/services/helpers/event-aggregator';
import * as fromStore from 'src/app/store/app.reducer';

@Component({
  selector: 'app-order-book',
  templateUrl: './order-book.component.html',
  styleUrls: ['./order-book.component.scss'],
})
export class OrderBookComponent implements OnInit {
  symbols: string[];
  allOrders$: Observable<any>; // TODO: create interfaces
  constructor(
    private store: Store<fromStore.AppState>,
    private exchangeService: ExchangeService,
    private eventAggregator: EventAggregator
  ) {
    this.store
      .select(fromStore.getSymbolsSelector)
      .subscribe((symbols) => (this.symbols = symbols)); // TODO: use async pipe or unsubscribe OnDestroy
  }

  ngOnInit(): void {
    this.allOrders$ = this.store.select(fromStore.getAllOrdersSelector);
  }

  getSellOrderShadow(index: number): string {
    if (8 - index === 0) {
      return '-0';
    } else if (8 - index < 0) {
      return '';
    }

    return '-' + (8 - index) + '0';
  }

  fillOrder(order) {
    const exchange$ = this.eventAggregator.exchange;
    const provider$ = this.eventAggregator.providerConnection;

    combineLatest([provider$, exchange$])
      .pipe(take(1))
      .subscribe((result) => {
        this.exchangeService.fillOrder(result[0], result[1], order);
      });
  }
}
