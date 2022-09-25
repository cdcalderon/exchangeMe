import { AppService } from './app.service';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import * as providerActions from '../../store/provider.actions';
import * as tokenActions from '../../store/token.actions';
import { ethers } from 'ethers';
import TokenJson from '../../../../bc/artifacts/contracts/Token.sol/Token.json';
declare let window: any;
import * as _ from 'lodash';
import { Token } from 'bc/typechain-types';
import { AppState } from 'src/app/store/app.reducer';
import { EventAggregator } from './helpers/event-aggregator';

@Injectable({
  providedIn: 'root',
})
export class ProviderService {
  constructor(
    private store: Store<AppState>,
    private eventAggregator: EventAggregator,
    private appService: AppService
  ) {}

  loadProvider(): ethers.providers.Web3Provider {
    let provider = new ethers.providers.Web3Provider(window.ethereum);
    this.eventAggregator.providerConnection.next(provider);

    //const clonedConnection = JSON.parse(JSON.stringify(connection));

    const clonedConnection = _.cloneDeep(provider);
    console.log('clonec conneciton,,,,,  ', clonedConnection);
    this.store.dispatch(
      providerActions.loadProvider({ connection: provider.connection })
    );

    return provider;
  }

  async loadNetwork(provider: ethers.providers.Web3Provider) {
    const { chainId } = await provider.getNetwork();
    this.store.dispatch(providerActions.loadNetwork({ chainId }));

    return chainId;
  }

  async loadAccount(provider: ethers.providers.Web3Provider) {
    const accounts = await window.ethereum.request({
      method: 'eth_requestAccounts',
    });
    const account = ethers.utils.getAddress(accounts[0]);
    this.store.dispatch(providerActions.loadAccount({ account }));

    const balance = await provider.getBalance(account);
    const formatedBalance = ethers.utils.formatEther(balance);
    console.log(formatedBalance);
    this.store.dispatch(
      providerActions.loadBalance({ balance: formatedBalance })
    );

    return account;
  }
}
