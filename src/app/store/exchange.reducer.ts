import { createReducer, on } from '@ngrx/store';
import {
  loadExchange,
  loadExchangeToken1Balance,
  loadExchangeToken2Balance,
  transferFailed,
  transferRequested,
  transferSuccess,
} from './exchange.actions';

export interface Transaccion {
  transactionType: string;
  isPending: boolean;
  isSuccessful: boolean;
  isError: boolean;
}

export interface ExchangeLoadedState {
  loaded: boolean;
  contract: any;
}

export interface ExchangeTokenBalanceLoadedState {
  balance: string;
}

export interface ExchangeTransferRequest {
  transaction: Transaccion;
  transferInProgress: boolean;
}

export interface ExchangeTransferSuccess {
  event: any;
}

export interface ExchangeState {
  loaded: boolean;
  contract: any;
  balances: string[];
  events: any[];
  transaction: Transaccion;
  transferInProgress: boolean;
}

export const initialState: ExchangeState = {
  loaded: false,
  contract: {},
  balances: [],
  events: [],
  transaction: null,
  transferInProgress: false,
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
  }))
);
