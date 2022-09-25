import { createReducer, on } from '@ngrx/store';
import {
  loadExchange,
  loadExchangeToken1Balance,
  loadExchangeToken2Balance,
} from './exchange.actions';

export interface ExchangeLoadedState {
  loaded: boolean;
  contract: any;
}

export interface ExchangeTokenBalanceLoadedState {
  balance: string;
}

export interface ExchangeState {
  loaded: boolean;
  contract: any;
  balances: string[];
}

export const initialState: ExchangeState = {
  loaded: false,
  contract: {},
  balances: [],
};

export const exchangeReducer = createReducer(
  initialState,
  on(loadExchange, (state, { loaded, contract }) => ({
    ...state,
    loaded,
    contract,
  })),
  on(loadExchangeToken1Balance, (state, { balance }) => ({
    ...state,
    balances: [balance],
  })),
  on(loadExchangeToken2Balance, (state, { balance }) => ({
    ...state,
    balances: [...state.balances, balance],
  }))
);
