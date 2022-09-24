import { createReducer, on } from '@ngrx/store';
import { loadExchange } from './exchange.actions';

export interface ExchangeLoadedState {
  loaded: boolean;
  contract: any;
}

export interface ExchangeState {
  loaded: boolean;
  contract: any;
}

export const initialState: ExchangeState = {
  loaded: false,
  contract: {},
};

export const exchangeReducer = createReducer(
  initialState,
  on(loadExchange, (state, { loaded, contract }) => ({
    ...state,
    loaded,
    contract,
  }))
);
