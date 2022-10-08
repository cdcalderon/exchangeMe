import { createReducer, on } from '@ngrx/store';
import {
  allOrdersLoaded,
  loadExchange,
  loadExchangeToken1Balance,
  loadExchangeToken2Balance,
  newOrderCreated,
  newOrderFailed,
  newOrderSuccess,
  orderCancelFailed,
  orderCancelRequest,
  orderCancelSuccess,
  orderFillFailed,
  orderFillRequest,
  orderFillSuccess,
  ordersCancelledLoaded,
  ordersFilledLoaded,
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

export interface ExchangeOrdersLoaded {
  allOrders: Orders;
}

export interface ExchangeOrdersCancelledLoaded {
  cancelledOrders: Orders;
}

export interface ExchangeOrdersFilledLoaded {
  filledOrders: Orders;
}

export interface ExchangeOrderCancelRequest {
  transaction: Transaction;
}

export interface ExchangeOrderCancelFailed {
  transaction: Transaction;
}

export interface ExchangeOrderCancelSuccess {
  transaction: Transaction;
  cancelledOrder: Orders;
  event: any;
}

export interface ExchangeOrderFillRequest {
  transaction: Transaction;
}

export interface ExchangeOrderFillFailed {
  transaction: Transaction;
}

export interface ExchangeOrderFillSuccess {
  transaction: Transaction;
  filledOrder: any;
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
  cancelledOrders?: Orders;
  filledOrders?: Orders;
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
  cancelledOrders: {
    loaded: false,
    data: [],
  },
  filledOrders: {
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
    let index = state.allOrders.data.findIndex(
      (o) => o.id.toString() === order.id.toString()
    );
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
      events: [event, ...state.events],
    };
  }),
  on(newOrderFailed, (state, { transaction }) => ({
    ...state,
    transaction,
  })),

  // Orders Loaded

  on(allOrdersLoaded, (state, { allOrders }) => ({
    ...state,
    allOrders,
  })),
  on(ordersCancelledLoaded, (state, { cancelledOrders }) => ({
    ...state,
    cancelledOrders,
  })),
  on(ordersFilledLoaded, (state, { filledOrders }) => ({
    ...state,
    filledOrders,
  })),

  // Cancel Orders
  on(orderCancelRequest, (state, { transaction }) => ({
    ...state,
    transaction,
  })),
  on(orderCancelFailed, (state, { transaction }) => ({
    ...state,
    transaction,
  })),
  on(orderCancelSuccess, (state, { transaction, cancelledOrder, event }) => ({
    ...state,
    transaction,
    cancelledOrders: {
      ...state.cancelledOrders,
      data: [...state.cancelledOrders.data, cancelledOrder],
    },
    events: [event, ...state.events],
  })),

  // Fill Orders
  on(orderFillRequest, (state, { transaction }) => ({
    ...state,
    transaction,
  })),
  on(orderFillFailed, (state, { transaction }) => ({
    ...state,
    transaction,
  })),
  on(orderFillSuccess, (state, { transaction, filledOrder, event }) => {
    let data;
    // Prevent duplicate orders
    let index = state.filledOrders.data.findIndex(
      (order) => order.id.toString() === filledOrder.id.toString()
    );

    if (index === -1) {
      // not exist
      data = [...state.filledOrders.data, filledOrder];
    } else {
      data = state.allOrders.data;
    }

    return {
      ...state,
      transaction,
      filledOrders: {
        ...state.filledOrders,
        data,
      },
      events: [event, ...state.events],
    };
  })
);

export const getAllOrders = (state: ExchangeState) => state.allOrders.data;
