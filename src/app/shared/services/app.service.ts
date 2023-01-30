import { Injectable } from '@angular/core';
import { Token } from '../../../typechain-types';
import { ethers } from 'ethers';
import { EventAggregator } from './helpers/event-aggregator';

// TODO: Remove use for testing purposes only
@Injectable({
  providedIn: 'root',
})
export class AppService {
  private _providerConnection: ethers.providers.Web3Provider =
    {} as ethers.providers.Web3Provider;
  private _token1: Token = null;
  private _token2: Token = null;

  constructor(public eventAggregator: EventAggregator) {
    this.eventAggregator.providerConnection.subscribe(
      (pc) => (this._providerConnection = pc)
    );

    this.eventAggregator.token1.subscribe((t) => {
      this._token1 = t;
    });
    this.eventAggregator.token2.subscribe((t) => (this._token2 = t));
  }

  public get providerConnection(): ethers.providers.Web3Provider {
    return this._providerConnection;
  }

  public get token1(): Token {
    return this._token1;
  }
}
