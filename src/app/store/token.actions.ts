import { createAction, props } from '@ngrx/store';
import { LoadTokenBalance, LoadTokenState, TokenState } from './token.reducer';

export const loadToken1 = createAction(
  '[TOKEN_LOADED_1] TokenLoaded_1',
  props<LoadTokenState>()
);

export const loadToken2 = createAction(
  '[TOKEN_LOADED_2] TokenLoaded_2',
  props<LoadTokenState>()
);

export const loadToken1Balance = createAction(
  '[TOKEN_1_BALANCE_LOADED] Token1BalanceLoaded',
  props<LoadTokenBalance>()
);

export const loadToken2Balance = createAction(
  '[TOKEN_2_BALANCE_LOADED] Token2BalanceLoaded',
  props<LoadTokenBalance>()
);
