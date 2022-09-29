import { createReducer, on } from '@ngrx/store';
import {
  loadExchange,
  loadExchangeToken1Balance,
  loadExchangeToken2Balance,
  newOrderCreated,
  newOrderFailed,
  newOrderSuccess,
  transferFailed,
  transferRequested,
  transferSuccess,
} from './exchange.actions';

export interface Transaction {
  transactionType: string;
  isPending: boolean;
  isSuccessful: boolean;
  isError: boolean;
}

export interface Orders {
  loaded: boolean;
  data: any[];
}

export interface ExchangeLoadedState {
  loaded: boolean;
  contract: any;
}

export interface ExchangeTokenBalanceLoadedState {
  balance: string;
}

export interface ExchangeTransferRequest {
  transaction: Transaction;
  transferInProgress: boolean;
}

export interface ExchangeOrderRequest {
  transaction: Transaction;
}

export interface ExchangeOrderSuccess {
  order: any;
  event: any;
  transaction: Transaction;
}

export interface ExchangeTransferSuccess {
  event: any;
}

export interface ExchangeState {
  loaded: boolean;
  contract: any;
  balances: string[];
  events: any[];
  transaction: Transaction;
  transferInProgress: boolean;
  order?: any;
  allOrders?: Orders;
}

export const initialState: ExchangeState = {
  loaded: false,
  contract: {},
  balances: [],
  events: [],
  transaction: null,
  transferInProgress: false,
  allOrders: {
    loaded: false,
    data: [],
  },
};

export const exchangeReducer = createReducer(
  initialState,
  on(loadExchange, (state, { loaded, contract }) => ({
    ...state,
    loaded,
    contract,
  })),

  // Balances
  on(loadExchangeToken1Balance, (state, { balance }) => ({
    ...state,
    balances: [balance],
  })),
  on(loadExchangeToken2Balance, (state, { balance }) => ({
    ...state,
    balances: [...state.balances, balance],
  })),

  // Transfers

  on(transferRequested, (state, { transaction, transferInProgress }) => ({
    ...state,
    transaction,
    transferInProgress,
  })),
  on(transferSuccess, (state, { event }) => ({
    ...state,
    events: [event, ...state.events],
  })),
  on(transferFailed, (state, { transaction, transferInProgress }) => ({
    ...state,
    transaction,
    transferInProgress,
  })),

  // Orders
  on(newOrderCreated, (state, { transaction }) => ({
    ...state,
    transaction,
  })),
  on(newOrderSuccess, (state, { order, event, transaction }) => {
    // Prevent duplicate orders
    let index = state.allOrders.data.findIndex((o) => o.id === order.id);
    let data;

    if (index === -1) {
      data = [...state.allOrders.data, order];
    } else {
      data = state.allOrders.data;
    }
    return {
      ...state,
      allOrders: {
        ...state.allOrders,
        data,
      },
      transaction,
      // transaction: {
      //   transactionType: 'New Order',
      //   isPending: false,
      //   isSuccessful: true,
      // },
      events: [event, ...state.events],
    };
  }),
  on(newOrderFailed, (state, { transaction }) => ({
    ...state,
    transaction,
  }))
);
