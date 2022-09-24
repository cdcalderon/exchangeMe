import { createAction, props } from '@ngrx/store';
import { ExchangeLoadedState } from './exchange.reducer';

export const loadExchange = createAction(
  '[EXCHANGE_LOADED] ExchangeLoaded',
  props<ExchangeLoadedState>()
);
