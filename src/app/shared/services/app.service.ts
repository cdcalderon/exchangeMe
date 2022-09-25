import { Injectable } from '@angular/core';
import { ethers } from 'ethers';
import { EventAggregator } from './helpers/event-aggregator';

@Injectable({
  providedIn: 'root',
})
export class AppService {
  private _providerConnection: ethers.providers.Web3Provider =
    {} as ethers.providers.Web3Provider;

  constructor(public eventAggregator: EventAggregator) {
    this.eventAggregator.providerConnection.subscribe(
      (pc) => (this._providerConnection = pc)
    );
  }

  public get providerConnection(): ethers.providers.Web3Provider {
    return this._providerConnection;
  }
}
