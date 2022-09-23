import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import * as providerActions from '../../store/provider.actions';
import * as tokenActions from '../../store/token.actions';
import { ethers } from 'ethers';
import TokenJson from '../../../../bc/artifacts/contracts/Token.sol/Token.json';
declare let window: any;
import * as _ from 'lodash';
import { Token } from 'bc/typechain-types';

@Injectable({
  providedIn: 'root',
})
export class ProviderService {
  constructor(private store: Store<{ connection: string }>) {}

  loadProvider(): ethers.providers.Web3Provider {
    let connection = new ethers.providers.Web3Provider(window.ethereum);
    //const clonedConnection = JSON.parse(JSON.stringify(connection));

    const clonedConnection = _.cloneDeep(connection);
    console.log('clonec conneciton,,,,,  ', clonedConnection);
    this.store.dispatch(
      providerActions.loadProvider({ connection: 'clonedConnection' })
    );

    return connection;
  }

  async loadNetwork(provider: ethers.providers.Web3Provider) {
    const { chainId } = await provider.getNetwork();
    this.store.dispatch(providerActions.loadNetwork({ chainId }));

    return chainId;
  }

  async loadAccount() {
    const accounts = await window.ethereum.request({
      method: 'eth_requestAccounts',
    });
    const account = ethers.utils.getAddress(accounts[0]);

    this.store.dispatch(providerActions.loadAccount({ account }));

    return account;
  }
}
