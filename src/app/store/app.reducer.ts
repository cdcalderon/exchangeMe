import * as provider from './provider.reducer';
import { ActionReducerMap } from '@ngrx/store';

export interface AppState {
  provider: provider.State;
}

export const appReducers: ActionReducerMap<AppState> = {
  provider: provider.providerReducer,
};
