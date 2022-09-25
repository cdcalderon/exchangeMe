import { createReducer, on } from '@ngrx/store';
import { loadToken1, loadToken2 } from './token.actions';

export interface LoadTokenState {
  loaded: boolean;
  contract: any;
  symbol: string;
}

export interface TokenState {
  loaded: boolean;
  contracts: any[];
  symbols: string[];
}

export const tokenInitialState: TokenState = {
  loaded: false,
  contracts: [],
  symbols: [],
};

export const tokenReducer = createReducer(
  tokenInitialState,
  on(loadToken1, (state, { loaded, contract, symbol }) => ({
    ...state,
    loaded,
    contracts: [contract],
    symbols: [symbol],
  })),
  on(loadToken2, (state, { loaded, contract, symbol }) => ({
    ...state,
    loaded,
    contracts: [...state.contracts, contract],
    symbols: [...state.symbols, symbol],
  }))
);
