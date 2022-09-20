import { createAction, props } from '@ngrx/store';
import { TokenState } from './token.reducer';

export const loadToken = createAction(
  '[TOKEN_LOADED] TokenLoaded',
  props<TokenState>()
);
