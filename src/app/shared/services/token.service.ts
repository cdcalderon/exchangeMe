import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import * as tokenActions from '../../store/token.actions';
import * as exchangeActions from '../../store/exchange.actions';
import { ethers } from 'ethers';
import TokenJson from '../../../abis/Token.json';
declare let window: any;
import * as _ from 'lodash';
import { Exchange, Token } from '../../../typechain-types';
import { AppState } from 'src/app/store/app.reducer';
import { EventAggregator } from './helpers/event-aggregator';

@Injectable({
  providedIn: 'root',
})
export class TokenService {
  constructor(
    private store: Store<AppState>,
    private eventAggregator: EventAggregator
  ) {}

  async loadTokens(
    provider: ethers.providers.Web3Provider,
    addresses: string[]
  ) {
    let token = new ethers.Contract(
      addresses[0],
      TokenJson.abi,
      provider
    ) as Token;

    let symbol = await token.symbol();
    this.store.dispatch(
      tokenActions.loadToken1({
        loaded: true,
        contract: token.address,
        symbol: symbol,
      })
    );
    this.eventAggregator.token1.next(token);

    token = new ethers.Contract(addresses[1], TokenJson.abi, provider) as Token;
    symbol = await token.symbol();
    this.store.dispatch(
      tokenActions.loadToken2({
        loaded: true,
        contract: token.address,
        symbol: symbol,
      })
    );
    this.eventAggregator.token2.next(token);

    return token;
  }

  async loadBalances(exchange: Exchange, tokens: Token[], account) {
    let balance = ethers.utils.formatUnits(
      await tokens[0].balanceOf(account),
      18
    );
    this.store.dispatch(tokenActions.loadToken1Balance({ balance }));

    balance = ethers.utils.formatUnits(
      await exchange.balanceOf(tokens[0].address, account),
      18
    );
    this.store.dispatch(exchangeActions.loadExchangeToken1Balance({ balance }));

    balance = ethers.utils.formatUnits(await tokens[1].balanceOf(account), 18);
    this.store.dispatch(tokenActions.loadToken2Balance({ balance }));

    balance = ethers.utils.formatUnits(
      await exchange.balanceOf(tokens[1].address, account),
      18
    );
    this.store.dispatch(exchangeActions.loadExchangeToken2Balance({ balance }));
  }

  async transferTokens(
    provider: ethers.providers.Web3Provider,
    exchange: Exchange,
    transferType,
    token: Token,
    amount: number
  ) {
    let transaction;

    const transaccionRequest = {
      transaction: {
        transactionType: 'Transfer',
        isPending: true,
        isSuccessful: false,
        isError: false,
      },
      transferInProgress: true,
    };

    this.store.dispatch(exchangeActions.transferRequested(transaccionRequest));
    try {
      const signer = await provider.getSigner();
      const amountToTransfer = ethers.utils.parseUnits(amount.toString(), 18);

      if (transferType === 'Deposit') {
        transaction = await token
          .connect(signer)
          .approve(exchange.address, amountToTransfer);
        await transaction.wait();
        transaction = await exchange
          .connect(signer)
          .depositToken(token.address, amountToTransfer);
      } else {
        transaction = await exchange
          .connect(signer)
          .withdrawToken(token.address, amountToTransfer);
      }

      await transaction.wait();
    } catch (error) {
      const transaccionFailed = {
        transaction: {
          transactionType: 'Transfer',
          isPending: false,
          isSuccessful: false,
          isError: true,
        },
        transferInProgress: false,
      };
      this.store.dispatch(exchangeActions.transferFailed(transaccionFailed));
    }
  }
}
