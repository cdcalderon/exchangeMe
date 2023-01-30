import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { ethers } from 'ethers';
import { Exchange, Token } from '../../../../typechain-types';

@Injectable({
  providedIn: 'root',
})
export class EventAggregator {
  public providerConnection =
    new BehaviorSubject<ethers.providers.Web3Provider>(null);
  public token1 = new BehaviorSubject<Token>(null);
  public token2 = new BehaviorSubject<Token>(null);
  public exchange = new BehaviorSubject<Exchange>(null);
  public reloadBalances = new BehaviorSubject<boolean>(false);
  public waiting = new BehaviorSubject<boolean>(false);
}
