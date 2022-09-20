import { createReducer, on } from '@ngrx/store';
import { loadToken } from './token.actions';

export interface TokenState {
  loaded: boolean;
  contract: any;
  symbol: string;
}

export const tokenInitialState: TokenState = {
  loaded: false,
  contract: null,
  symbol: '',
};

export const tokenReducer = createReducer(
  tokenInitialState,
  on(loadToken, (state, { loaded, contract, symbol }) => ({
    ...state,
    loaded,
    contract,
    symbol,
  }))
);
