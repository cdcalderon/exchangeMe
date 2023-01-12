import { ProviderService } from './shared/services/provider.service';
declare let window: any;
import { Component, OnInit } from '@angular/core';
import configContracts from '../environments/contract-address.json';
import { Store } from '@ngrx/store';
import { TokenService } from './shared/services/token.service';
import { ExchangeService } from './shared/services/exchange.service';
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

  constructor(
    private store: Store<AppState>,
    private providerService: ProviderService,
    private tokenService: TokenService,
    private exchangeService: ExchangeService
  ) {}

  async ngOnInit() {
    this.store.subscribe((state) => {
      console.log('ngrx State ', state);
    });
    // Connect Ethers to blockchain
    const provider = this.loadProvider();
    // Fetch current network's chainId (e.g. hardhat: 31337, kovan: 42)
    const chainId = await this.loadNetwork(provider)!;
    console.log(chainId);

    // Reload page when network changes
    window.ethereum.on('chainChanged', () => {
      window.location.reload();
    });

    // Fetch current account & balance from Metamask when changed
    window.ethereum.on('accountsChanged', () => {
      this.loadAccount(provider);
    });

    // Load token smart contracts
    const PCHO = configContracts[chainId].PCHO;
    const JEDY = configContracts[chainId].JEDY;
    this.loadTokens(provider, [PCHO.address, JEDY.address]);

    // Load exchange smart contract
    const exchangeConfig = configContracts[chainId].exchange;
    const exchangeContract = await this.exchangeService.loadExchange(
      provider,
      exchangeConfig.address
    );

    // Fetch all orders: Open, Cancelled, Filled
    this.exchangeService.loadAllOrders(provider, exchangeContract);

    // Listen to exchange events
    this.exchangeService.subscribeToEvents(exchangeContract);
  }

  loadProvider() {
    return this.providerService.loadProvider();
  }

  async loadNetwork(provider: any) {
    return this.providerService.loadNetwork(provider);
  }

  async loadAccount(provider: any) {
    return this.providerService.loadAccount(provider);
  }

  async loadTokens(provider: any, addresses: string[]) {
    return this.tokenService.loadTokens(provider, addresses);
  }
}
