import { createReducer, on } from '@ngrx/store';
import {
  loadToken1,
  loadToken1Balance,
  loadToken2,
  loadToken2Balance,
} from './token.actions';

export interface LoadTokenState {
  loaded: boolean;
  contract: any;
  symbol: string;
}

export interface LoadTokenBalance {
  balance: string;
}

export interface TokenState {
  loaded: boolean;
  contracts: any[];
  symbols: string[];
  balances: string[];
}

export const tokenInitialState: TokenState = {
  loaded: false,
  contracts: [],
  symbols: [],
  balances: [],
};

export const tokenReducer = createReducer(
  tokenInitialState,
  on(loadToken1, (state, { loaded, contract, symbol }) => ({
    ...state,
    loaded,
    contracts: [contract],
    symbols: [symbol],
  })),
  on(loadToken1Balance, (state, { balance }) => ({
    ...state,
    balances: [balance],
  })),
  on(loadToken2, (state, { loaded, contract, symbol }) => ({
    ...state,
    loaded,
    contracts: [...state.contracts, contract],
    symbols: [...state.symbols, symbol],
  })),
  on(loadToken2Balance, (state, { balance }) => ({
    ...state,
    balances: [...state.balances, balance],
  }))
);

export const getSymbols = (state: TokenState) => state.symbols;
