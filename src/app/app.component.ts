import { SignerWithAddress } from '@nomiclabs/hardhat-ethers/signers';
import { ethers } from 'ethers';

declare let window: any;
import { Component, OnInit } from '@angular/core';
import Token from '../../bc/artifacts/contracts/Token.sol/Token.json';
import addresses from '../environments/contract-address.json';
import { Store } from '@ngrx/store';
import * as actions from './store/provider.actions';

interface AppState {}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  signer: any;
  tokenContract: any;
  signerAddress: any;

  constructor(private store: Store<{ connection: string }>) {}

  async ngOnInit() {
    this.store.subscribe((state) => {
      console.log('ngrx State ', state);
    });

    const provider = this.loadProvider();
    await provider.send('eth_requestAccounts', []); // <- this promps user to connect metamask
    // Reload page when network changes

    window.ethereum.on('chainChanged', () => {
      window.location.reload();
    });

    // Fetch current account & balance from Metamask when changed
    window.ethereum.on('accountsChanged', () => {
      this.loadAccount(provider);
    });
    // const provider = new ethers.providers.Web3Provider(window.ethereum, 'any');

    // const connection = this.loadProvider();
    const chainId = await this.loadNetwork(provider);
    console.log(chainId);

    provider.on('network', (newNetwork: any, oldNetwork: any) => {
      if (oldNetwork) {
        window.location.reload();
      }
    });

    this.signer = provider.getSigner();
    console.log('carlos Provider  ', this.signer);

    console.log('carlos Provider  ', await this.signer.getChainId());
    // if ((await this.signer.getChainId()) !== 80001) {
    //   alert('Please change your network to ');
    // }
    const networkId = 31337;
    const rootConfig = addresses[networkId];
    console.log('address from config ', rootConfig.PCHO);
    this.tokenContract = new ethers.Contract(
      rootConfig.PCHO.address,
      Token.abi,
      this.signer
    );

    console.log(this.tokenContract);
    const symbol = await this.tokenContract.name();

    // const tokenName = await this.tokenContract.name();
    // console.log('token name: ', tokenName);
    console.log('token symbol: ', symbol);
  }

  loadProvider() {
    const connection = new ethers.providers.Web3Provider(window.ethereum);
    this.store.dispatch(actions.loadProvider());
    return connection;
  }

  async loadNetwork(provider: any) {
    const { chainId } = await provider.getNetwork();
    return chainId;
  }

  async loadAccount(provider: any) {
    const accounts = await window.ethereum.request({
      method: 'eth_requestAccounts',
    });
    const account = ethers.utils.getAddress(accounts[0]);

    let balance = await provider.getBalance(account);
    balance = ethers.utils.formatEther(balance);

    return account;
  }

  // async loadTokens(provider: any, address: any) {
  //   let token, symbol;

  //   token = new ethers.Contract(address, Token.abi, provider);
  //   symbol = await token.symbol();

  //   return token;
  // }
}
