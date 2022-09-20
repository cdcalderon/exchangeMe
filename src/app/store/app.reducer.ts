import * as provider from './provider.reducer';
import * as token from './token.reducer';
import { ActionReducerMap } from '@ngrx/store';

export interface AppState {
  provider: provider.State;
  token: token.TokenState;
}

export const appReducers: ActionReducerMap<AppState> = {
  token: token.tokenReducer,
  provider: provider.providerReducer,
};
