import * as provider from './provider.reducer';
import * as token from './token.reducer';
import * as exchange from './exchange.reducer';
import { ActionReducerMap } from '@ngrx/store';

export interface AppState {
  provider: provider.State;
  token: token.TokenState;
  exchange: exchange.ExchangeState;
}

export const appReducers: ActionReducerMap<AppState> = {
  token: token.tokenReducer,
  provider: provider.providerReducer,
  exchange: exchange.exchangeReducer,
};
