import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import * as tokenActions from '../../store/token.actions';
import { ethers } from 'ethers';
import TokenJson from '../../../../bc/artifacts/contracts/Token.sol/Token.json';
declare let window: any;
import * as _ from 'lodash';
import { Token } from 'bc/typechain-types';

@Injectable({
  providedIn: 'root',
})
export class TokenService {
  constructor(private store: Store<{ connection: string }>) {}

  async loadToken(provider: ethers.providers.Web3Provider, address: string) {
    const token = new ethers.Contract(
      address,
      TokenJson.abi,
      provider
    ) as Token;
    const symbol = await token.symbol();
    this.store.dispatch(
      tokenActions.loadToken({ loaded: true, contract: 'test', symbol: symbol })
    );

    return token;
  }
}
