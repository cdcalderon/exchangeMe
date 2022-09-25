import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import * as tokenActions from '../../store/token.actions';
import { ethers } from 'ethers';
import TokenJson from '../../../../bc/artifacts/contracts/Token.sol/Token.json';
declare let window: any;
import * as _ from 'lodash';
import { Token } from 'bc/typechain-types';
import { AppState } from 'src/app/store/app.reducer';
import { EventAggregator } from './helpers/event-aggregator';

@Injectable({
  providedIn: 'root',
})
export class TokenService {
  constructor(
    private store: Store<AppState>,
    private eventAggregator: EventAggregator
  ) {}

  async loadTokens(
    provider: ethers.providers.Web3Provider,
    addresses: string[]
  ) {
    let token = new ethers.Contract(
      addresses[0],
      TokenJson.abi,
      provider
    ) as Token;

    let symbol = await token.symbol();
    this.store.dispatch(
      tokenActions.loadToken1({
        loaded: true,
        contract: token.address,
        symbol: symbol,
      })
    );
    this.eventAggregator.token1.next(token);

    token = new ethers.Contract(addresses[1], TokenJson.abi, provider) as Token;
    symbol = await token.symbol();
    this.store.dispatch(
      tokenActions.loadToken2({
        loaded: true,
        contract: token.address,
        symbol: symbol,
      })
    );
    this.eventAggregator.token2.next(token);

    return token;
  }
}
