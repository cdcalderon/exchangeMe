import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Exchange } from 'bc/typechain-types';
import { ethers } from 'ethers';
import { AppState } from 'src/app/store/app.reducer';
import ExchangeJson from '../../../../bc/artifacts/contracts/Exchange.sol/Exchange.json';
import * as exchangeActions from '../../store/exchange.actions';
import { EventAggregator } from './helpers/event-aggregator';

@Injectable({
  providedIn: 'root',
})
export class ExchangeService {
  constructor(
    private store: Store<AppState>,
    private eventAggregator: EventAggregator
  ) {}

  async loadExchange(provider: ethers.providers.Web3Provider, address: string) {
    const exchange = new ethers.Contract(
      address,
      ExchangeJson.abi,
      provider
    ) as Exchange;

    this.store.dispatch(
      exchangeActions.loadExchange({ loaded: true, contract: exchange.address })
    );
    this.eventAggregator.exchange.next(exchange);
  }
}
