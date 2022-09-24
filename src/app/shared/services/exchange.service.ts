import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { ethers } from 'ethers';
import ExchangeJson from '../../../../bc/artifacts/contracts/Exchange.sol/Exchange.json';
import * as exchangeActions from '../../store/exchange.actions';

@Injectable({
  providedIn: 'root',
})
export class ExchangeService {
  constructor(private store: Store<{ connection: string }>) {}

  async loadExchange(provider: ethers.providers.Web3Provider, address: string) {
    const exchange = new ethers.Contract(address, ExchangeJson.abi, provider);

    this.store.dispatch(
      exchangeActions.loadExchange({ loaded: true, contract: exchange.address })
    );
  }
}
