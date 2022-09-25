import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { map, Observable } from 'rxjs';
import { TokenService } from 'src/app/shared/services/token.service';
import { AppState } from 'src/app/store/app.reducer';
import configContracts from '../../../environments/contract-address.json';
import { ethers } from 'ethers';
import { EventAggregator } from 'src/app/shared/services/helpers/event-aggregator';

@Component({
  selector: 'app-market-pairs',
  templateUrl: './market-pairs.component.html',
  styleUrls: ['./market-pairs.component.scss'],
})
export class MarketPairsComponent implements OnInit {
  configContractsSettings = configContracts;
  chainId$!: Observable<number>;
  provider$!: Observable<ethers.providers.Web3Provider>;

  constructor(
    private store: Store<AppState>,
    private tokenService: TokenService,
    private eventAggregator: EventAggregator
  ) {}

  ngOnInit(): void {
    this.provider$ = this.eventAggregator.providerConnection;
    this.chainId$ = this.store.select('provider').pipe(map((p) => p.chainId));
  }

  changeTokenPair(
    tokenPairAddresses: string[],
    chainId: number,
    provider: ethers.providers.Web3Provider
  ) {
    //const tokenAddresses = configContracts[chainId];
    this.tokenService.loadTokens(provider, tokenPairAddresses);
  }
}
