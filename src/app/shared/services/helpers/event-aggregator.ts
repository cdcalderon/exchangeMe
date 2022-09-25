import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { ethers } from 'ethers';

@Injectable({
  providedIn: 'root',
})
export class EventAggregator {
  public providerConnection =
    new BehaviorSubject<ethers.providers.Web3Provider>(
      {} as ethers.providers.Web3Provider
    );
}
