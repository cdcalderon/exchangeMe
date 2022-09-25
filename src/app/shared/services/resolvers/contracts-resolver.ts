import { ResolvedContracts } from './../../models/resolvedContracts';
import { ActivatedRouteSnapshot, Resolve } from '@angular/router';
import { combineLatest, filter, forkJoin, Observable, of, take } from 'rxjs';
import { EventAggregator } from '../helpers/event-aggregator';
import { ethers } from 'ethers';
import { offset } from '@popperjs/core';
import { Injectable } from '@angular/core';
import { Exchange, Token } from 'bc/typechain-types';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class ContractsResolver implements Resolve<any> {
  provider$: Observable<ethers.providers.Web3Provider> =
    this.eventAggregator.providerConnection;
  token1$: Observable<Token> = this.eventAggregator.token1;
  token2$: Observable<Token> = this.eventAggregator.token2;
  exchange$: Observable<Exchange> = this.eventAggregator.exchange;

  constructor(private eventAggregator: EventAggregator) {}

  resolve(route: ActivatedRouteSnapshot): Observable<ResolvedContracts> {
    return combineLatest([
      this.provider$.pipe(filter((p) => p != null)),
      this.token1$.pipe(filter((t) => t != null)),
      this.token2$.pipe(filter((t) => t != null)),
      this.exchange$.pipe(filter((t) => t != null)),
    ]).pipe(
      take(1),
      map((result) => {
        return {
          provider: result[0],
          token1: result[1],
          token2: result[2],
          exchange: result[3],
        };
      })
    );
  }
}
