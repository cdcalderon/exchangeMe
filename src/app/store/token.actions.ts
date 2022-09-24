import { createAction, props } from '@ngrx/store';
import { LoadTokenState, TokenState } from './token.reducer';

export const loadToken1 = createAction(
  '[TOKEN_LOADED_1] TokenLoaded_1',
  props<LoadTokenState>()
);

export const loadToken2 = createAction(
  '[TOKEN_LOADED_2] TokenLoaded_2',
  props<LoadTokenState>()
);
