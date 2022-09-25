import { ActivatedRouteSnapshot, Resolve } from '@angular/router';
import { combineLatest, filter, forkJoin, Observable, of, take } from 'rxjs';
import { EventAggregator } from '../helpers/event-aggregator';
import { ethers } from 'ethers';
import { offset } from '@popperjs/core';
import { Injectable } from '@angular/core';
import { Token } from 'bc/typechain-types';

@Injectable({
  providedIn: 'root',
})
export class ContractsResolver implements Resolve<any> {
  provider$: Observable<ethers.providers.Web3Provider> =
    this.eventAggregator.providerConnection;
  token1$: Observable<Token> = this.eventAggregator.token1;
  token2$: Observable<Token> = this.eventAggregator.token2;

  constructor(private eventAggregator: EventAggregator) {}

  resolve(route: ActivatedRouteSnapshot): Observable<any> {
    return combineLatest([
      this.provider$.pipe(filter((p) => p != null)),
      this.token1$.pipe(filter((t) => t != null)),
      this.token2$.pipe(filter((t) => t != null)),
    ]).pipe(take(1));
  }
}
