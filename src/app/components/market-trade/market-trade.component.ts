import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { combineLatest, filter, map, take, Subscription } from 'rxjs';
import { ResolvedContracts } from 'src/app/shared/models/resolvedContracts';
import { ExchangeService } from 'src/app/shared/services/exchange.service';
import { EventAggregator } from 'src/app/shared/services/helpers/event-aggregator';
import { AppState } from 'src/app/store/app.reducer';
import * as fromStore from 'src/app/store/app.reducer';

@Component({
  selector: 'app-market-trade',
  templateUrl: './market-trade.component.html',
  styleUrls: ['./market-trade.component.scss'],
})
export class MarketTradeComponent implements OnInit, OnDestroy {
  orderBuyPrice: number;
  orderBuyAmount: number;
  orderSellPrice: number;
  orderSellAmount: number;
  symbols: string[];
  subscription: Subscription;

  @Input() contracts: ResolvedContracts;
  constructor(
    private exchangeService: ExchangeService,
    private store: Store<AppState>,
    public eventAggregator: EventAggregator
  ) {}

  ngOnInit(): void {
    this.subscription = this.store
      .select(fromStore.getSymbolsSelector)
      .subscribe((s) => (this.symbols = s));
  }

  buyOrder() {
    this.eventAggregator.waiting.next(true);
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
        take(1)
        // switchMap((result) =>
        //   this.exchangeService.makeBuyOrder(
        //     this.contracts.provider,
        //     this.contracts.exchange,
        //     [result[0], result[1]],
        //     { amount: 1, price: 1 }
        //   )
        // )
      )
      .subscribe(
        (result) => {
          this.exchangeService.makeBuyOrder(
            this.contracts.provider,
            this.contracts.exchange,
            [result[0], result[1]],
            {
              amount: this.orderBuyAmount.toString(),
              price: this.orderBuyPrice.toString(),
            }
          );
        },
        () => this.eventAggregator.waiting.next(false)
      );

    this.resetAmounts();
  }

  sellOrder() {
    const token1$ = this.eventAggregator.token1;
    const token2$ = this.eventAggregator.token2;
    const account$ = this.store.select('provider').pipe(
      filter((p) => {
        return !!p.account;
      }),
      map((p) => p.account)
    );

    combineLatest([token1$, token2$, account$])
      .pipe(take(1))
      .subscribe((result) => {
        this.exchangeService.makeSellOrder(
          this.contracts.provider,
          this.contracts.exchange,
          [result[0], result[1]],
          {
            amount: this.orderSellAmount.toString(),
            price: this.orderSellPrice.toString(),
          }
        );
      });

    this.resetAmounts();
  }

  resetAmounts() {
    this.orderBuyPrice = null;
    this.orderBuyAmount = null;
    this.orderSellPrice = null;
    this.orderSellAmount = null;
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
