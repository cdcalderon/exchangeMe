import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Exchange } from 'bc/typechain-types';
import { ethers } from 'ethers';
import { AppState } from 'src/app/store/app.reducer';
import { Transaction } from 'src/app/store/exchange.reducer';
import ExchangeJson from '../../../../bc/artifacts/contracts/Exchange.sol/Exchange.json';
import * as exchangeActions from '../../store/exchange.actions';
import { EventAggregator } from './helpers/event-aggregator';

@Injectable({
  providedIn: 'root',
})
export class ExchangeService {
  constructor(
    private store: Store<AppState>,
    private eventAggregator: EventAggregator
  ) {}

  async loadExchange(
    provider: ethers.providers.Web3Provider,
    address: string
  ): Promise<Exchange> {
    const exchange = new ethers.Contract(
      address,
      ExchangeJson.abi,
      provider
    ) as Exchange;

    this.store.dispatch(
      exchangeActions.loadExchange({ loaded: true, contract: exchange.address })
    );
    this.eventAggregator.exchange.next(exchange);

    return exchange;
  }

  subscribeToEvents(exchange) {
    exchange.on('Deposit', (token, user, amount, balance, event) => {
      this.store.dispatch(exchangeActions.transferSuccess(event));
    });

    exchange.on('Withdraw', (token, user, amount, balance, event) => {
      this.store.dispatch(exchangeActions.transferSuccess(event));
    });

    exchange.on(
      'Order',
      (
        id,
        user,
        tokenGet,
        amountGet,
        tokenGive,
        amountGive,
        timestamp,
        event
      ) => {
        const order = event.args;
        const transaccionSuccess: Transaction = {
          transactionType: 'New Order',
          isPending: false,
          isSuccessful: true,
          isError: false,
        };

        this.store.dispatch(
          exchangeActions.newOrderSuccess({
            order,
            event,
            transaction: transaccionSuccess,
          })
        );
      }
    );
  }

  async makeBuyOrder(provider, exchange, tokens, order) {
    const tokenGet = tokens[0].address;
    const amountGet = ethers.utils.parseUnits(order.amount, 18);
    const tokenGive = tokens[1].address;
    const amountGive = ethers.utils.parseUnits(
      (order.amount * order.price).toString(),
      18
    );

    const transaccionNewOrderRequest = {
      transaction: {
        transactionType: 'New Order',
        isPending: true,
        isSuccessful: false,
        isError: false,
      },
    };
    this.store.dispatch(
      exchangeActions.newOrderCreated(transaccionNewOrderRequest)
    );

    try {
      const signer = await provider.getSigner();
      const transaction = await exchange
        .connect(signer)
        .makeOrder(tokenGet, amountGet, tokenGive, amountGive);
      await transaction.wait();
    } catch (error) {
      const transaccionNewOrderRequestFailed = {
        transaction: {
          transactionType: 'New Order',
          isPending: false,
          isSuccessful: false,
          isError: true,
        },
      };
      this.store.dispatch(
        exchangeActions.newOrderFailed(transaccionNewOrderRequestFailed)
      );
    }
  }

  async makeSellOrder(provider, exchange, tokens, order) {
    const tokenGet = tokens[1].address;
    const amountGet = ethers.utils.parseUnits(
      (order.amount * order.price).toString(),
      18
    );
    const tokenGive = tokens[0].address;
    const amountGive = ethers.utils.parseUnits(order.amount, 18);

    const transaccionNewOrderRequest = {
      transaction: {
        transactionType: 'New Order',
        isPending: true,
        isSuccessful: false,
        isError: false,
      },
    };
    this.store.dispatch(
      exchangeActions.newOrderCreated(transaccionNewOrderRequest)
    );

    try {
      const signer = await provider.getSigner();
      const transaction = await exchange
        .connect(signer)
        .makeOrder(tokenGet, amountGet, tokenGive, amountGive);
      await transaction.wait();
    } catch (error) {
      const transaccionNewOrderRequestFailed = {
        transaction: {
          transactionType: 'New Order',
          isPending: false,
          isSuccessful: false,
          isError: true,
        },
      };
      this.store.dispatch(
        exchangeActions.newOrderFailed(transaccionNewOrderRequestFailed)
      );
    }
  }
}
