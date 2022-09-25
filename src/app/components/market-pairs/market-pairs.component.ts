import { Component, OnInit, Input } from '@angular/core';
import { Store } from '@ngrx/store';
import { filter, map, Observable } from 'rxjs';
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
export class MarketPairsComponent implements OnInit {
  configContractsSettings = configContracts;
  chainId$!: Observable<number>;
  provider$!: Observable<ethers.providers.Web3Provider>;
  tokenBalances$!: Observable<string[]>;
  exchangeBalances$!: Observable<string[]>;
  symbols$!: Observable<string[]>;
  token$!: Observable<TokenState>;
  token1TransferAmount: number;

  @Input() contracts: ResolvedContracts;

  constructor(
    private store: Store<AppState>,
    private tokenService: TokenService,
    private eventAggregator: EventAggregator
  ) {}

  ngOnInit(): void {
    this.provider$ = this.eventAggregator.providerConnection;
    this.chainId$ = this.store.select('provider').pipe(map((p) => p.chainId));

    this.store
      .select('provider')
      .pipe(
        filter((p) => {
          return !!p.account;
        }),
        map((p) => p.account)
      )
      .subscribe((account) => {
        this.tokenService.loadBalances(
          this.contracts.exchange,
          [this.contracts.token1, this.contracts.token2],
          account
        );
      });

    this.token$ = this.store.select('token');
    this.exchangeBalances$ = this.store.select('exchange', 'balances');
  }

  changeTokenPair(
    tokenPairAddresses: string[],
    chainId: number,
    provider: ethers.providers.Web3Provider
  ) {
    //const tokenAddresses = configContracts[chainId];
    this.tokenService.loadTokens(provider, tokenPairAddresses);
  }

  deposit(token: Token, amount: number) {
    this.tokenService.transferTokens(
      this.contracts.provider,
      this.contracts.exchange,
      'Deposit',
      token,
      amount
    );
  }
}
