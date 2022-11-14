import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Exchange } from 'bc/typechain-types';
import { ethers } from 'ethers';
import { AppState } from 'src/app/store/app.reducer';
import { Orders, Transaction } from 'src/app/store/exchange.reducer';
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
      console.log(
        'Deposit Complete..........',
        ethers.utils.formatEther(event.args.balance),
        0
      );
      this.store.dispatch(exchangeActions.transferSuccess(event));
      if (event?.args?.balance) {
        this.eventAggregator.reloadBalances.next(true);
        // this.store.dispatch(
        //   exchangeActions.exchangeToken1BalanceUpdated({
        //     balance: ethers.utils.formatEther(event.args.balance),
        //     index: 0,
        //   })
        // );
        // const amountV = ethers.utils.formatEther(amount);
        // const balanceV = ethers.utils.formatEther(balance);
        // this.store.dispatch(
        //   tokenActions.tokenBalanceUpdated({
        //     balance: ethers.utils.formatEther(amount),
        //     index: 0,
        //   })
        // );
      }
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

    exchange.on(
      'Cancel',
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
        const cancelledOrder = event.args;
        const transaccionSuccess: Transaction = {
          transactionType: 'Cancel',
          isPending: false,
          isSuccessful: true,
          isError: false,
        };
        this.store.dispatch(
          exchangeActions.orderCancelSuccess({
            transaction: transaccionSuccess,
            cancelledOrder,
            event,
          })
        );
      }
    );

    exchange.on(
      'Trade',
      (
        id,
        user,
        tokenGet,
        amountGet,
        tokenGive,
        amountGive,
        creator,
        timestamp,
        event
      ) => {
        const filledOrder = event.args;
        const transaccionSuccess: Transaction = {
          transactionType: 'Cancel',
          isPending: false,
          isSuccessful: true,
          isError: false,
        };
        this.store.dispatch(
          exchangeActions.orderFillSuccess({
            transaction: transaccionSuccess,
            filledOrder,
            event,
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

  async loadAllOrders(provider, exchange) {
    const block = await provider.getBlockNumber();
    const fromBlock = 0;

    // Fetch canceled orders from all orders
    const cancelStream = await exchange.queryFilter('Cancel', fromBlock, block);
    const cancelledOrders = cancelStream.map((event) => event.args);
    const ordersCancelled: Orders = { loaded: true, data: cancelledOrders };

    this.store.dispatch(
      exchangeActions.ordersCancelledLoaded({
        cancelledOrders: ordersCancelled,
      })
    );

    // Fetch filled orders from all orders
    const tradeStream = await exchange.queryFilter('Trade', fromBlock, block);
    const filledOrders = tradeStream.map((event) => event.args);
    const ordersFilled: Orders = { loaded: true, data: filledOrders };
    this.store.dispatch(
      exchangeActions.ordersFilledLoaded({ filledOrders: ordersFilled })
    );

    // Fetch all orders
    const orderStream = await exchange.queryFilter('Order', fromBlock, block);
    const allOrders = orderStream.map((event) => event.args);
    const orders: Orders = { loaded: true, data: allOrders };
    this.store.dispatch(exchangeActions.allOrdersLoaded({ allOrders: orders }));
  }

  async cancelOrder(provider, exchange, order) {
    const transaccionCancelOrderRequest = {
      transaction: {
        transactionType: 'Cancel',
        isPending: true,
        isSuccessful: false,
        isError: false,
      },
    };
    this.store.dispatch(
      exchangeActions.orderCancelRequest(transaccionCancelOrderRequest)
    );
    try {
      const signer = await provider.getSigner();
      const transaction = await exchange.connect(signer).cancelOrder(order.id);
      await transaction.wait();
    } catch (error) {
      const transaccionCancelOrderFailed = {
        transaction: {
          transactionType: 'Cancel',
          isPending: false,
          isSuccessful: false,
          isError: true,
        },
      };
      this.store.dispatch(
        exchangeActions.orderCancelRequest(transaccionCancelOrderFailed)
      );
    }
  }

  async fillOrder(provider, exchange, order) {
    this.store.dispatch(
      exchangeActions.orderFillRequest(
        this.getTrasaction('Fill Order', true, false, false)
      )
    );
    try {
      const signer = await provider.getSigner();
      const transaction = await exchange.connect(signer).fillOrder(order.id);
      await transaction.wait();
    } catch (error) {
      this.store.dispatch(
        exchangeActions.orderFillFailed(
          this.getTrasaction('Fill Order', false, false, true)
        )
      );
    }
  }

  private getTrasaction(
    transactionType: string,
    isPending: boolean,
    isSuccessful: boolean,
    isError: boolean
  ) {
    return {
      transaction: {
        transactionType,
        isPending,
        isSuccessful,
        isError,
      },
    };
  }
}
