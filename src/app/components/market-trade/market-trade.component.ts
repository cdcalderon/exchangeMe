import { Component, Input, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { combineLatest, filter, map, switchMap, take, tap } from 'rxjs';
import { ResolvedContracts } from 'src/app/shared/models/resolvedContracts';
import { ExchangeService } from 'src/app/shared/services/exchange.service';
import { EventAggregator } from 'src/app/shared/services/helpers/event-aggregator';
import { AppState } from 'src/app/store/app.reducer';

@Component({
  selector: 'app-market-trade',
  templateUrl: './market-trade.component.html',
  styleUrls: ['./market-trade.component.scss'],
})
export class MarketTradeComponent implements OnInit {
  orderBuyPrice: number;
  orderBuyAmount: number;
  @Input() contracts: ResolvedContracts;
  constructor(
    private exchangeService: ExchangeService,
    private store: Store<AppState>,
    public eventAggregator: EventAggregator
  ) {}

  ngOnInit(): void {}

  buyOrder() {
    const token1$ = this.eventAggregator.token1;
    const token2$ = this.eventAggregator.token2;
    const account$ = this.store.select('provider').pipe(
      filter((p) => {
        return !!p.account;
      }),
      map((p) => p.account)
    );

    combineLatest([token1$, token2$, account$])
      .pipe(
        take(1),
        switchMap((result) =>
          this.exchangeService.makeBuyOrder(
            this.contracts.provider,
            this.contracts.exchange,
            [result[0], result[1]],
            { amount: this.orderBuyAmount, price: this.orderBuyPrice }
          )
        )
      )
      .subscribe();
  }
  //this.exchangeService.makeBuyOrder();
}
