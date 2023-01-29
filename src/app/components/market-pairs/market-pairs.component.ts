import {
  Component,
  OnInit,
  Input,
  SimpleChanges,
  OnChanges,
} from '@angular/core';
import { Store } from '@ngrx/store';
import {
  filter,
  map,
  Observable,
  switchMap,
  forkJoin,
  combineLatest,
  take,
  tap,
} from 'rxjs';
import { TokenService } from 'src/app/shared/services/token.service';
import { AppState } from 'src/app/store/app.reducer';
import configContracts from '../../../environments/contract-address.json';
import { ethers } from 'ethers';
import { EventAggregator } from 'src/app/shared/services/helpers/event-aggregator';
import { ResolvedContracts } from 'src/app/shared/models/resolvedContracts';
import { TokenState } from 'src/app/store/token.reducer';
import { Token } from 'bc/typechain-types';

@Component({
  selector: 'app-market-pairs',
  templateUrl: './market-pairs.component.html',
  styleUrls: ['./market-pairs.component.scss'],
})
export class MarketPairsComponent implements OnInit, OnChanges {
  configContractsSettings = configContracts;
  chainId$!: Observable<number>;
  provider$!: Observable<ethers.providers.Web3Provider>;
  tokenBalances$!: Observable<string[]>;
  exchangeBalances$!: Observable<string[]>;
  symbols$!: Observable<string[]>;
  token$!: Observable<TokenState>;
  token1TransferAmount: number;
  token2TransferAmount: number;

  @Input() contracts: ResolvedContracts;
  @Input() transferInProgress: boolean;

  constructor(
    private store: Store<AppState>,
    private tokenService: TokenService,
    private eventAggregator: EventAggregator
  ) {}

  ngOnChanges(changes: SimpleChanges) {
    let tt = changes;
  }

  ngOnInit(): void {
    this.provider$ = this.eventAggregator.providerConnection;
    this.chainId$ = this.store.select('provider').pipe(map((p) => p.chainId));

    this.loadBalances();

    this.token$ = this.store.select('token');
    this.exchangeBalances$ = this.store.select('exchange', 'balances');

    this.eventAggregator.reloadBalances.subscribe(
      (reloadNeeded) => reloadNeeded && this.loadBalances()
    );
  }

  async changeTokenPair(
    tokenPairAddresses: string[],
    chainId: number,
    provider: ethers.providers.Web3Provider
  ) {
    //const tokenAddresses = configContracts[chainId];
    await this.tokenService.loadTokens(provider, tokenPairAddresses);
    this.loadBalances();
  }

  async deposit(token: Token, amount: number) {
    this.eventAggregator.waiting.next(true);
    await this.tokenService.transferTokens(
      this.contracts.provider,
      this.contracts.exchange,
      'Deposit',
      token,
      amount
    );

    this.resetAmounts();
  }

  async withdraw(token: Token, amount: number) {
    this.eventAggregator.waiting.next(true);
    await this.tokenService.transferTokens(
      this.contracts.provider,
      this.contracts.exchange,
      'Withdraw',
      token,
      amount
    );

    this.resetAmounts();
  }

  resetAmounts() {
    this.token1TransferAmount = null;
    this.token2TransferAmount = null;
  }

  loadBalances() {
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
        tap((result) => {
          this.contracts.token1 = result[0];
          this.contracts.token2 = result[1];
        }),
        switchMap(([token1, token2, account]) =>
          this.tokenService.loadBalances(
            this.contracts.exchange,
            [token1, token2],
            account
          )
        )
      )
      .subscribe();
  }

  scroll(el: HTMLElement) {
    el.scrollIntoView();
  }
}
