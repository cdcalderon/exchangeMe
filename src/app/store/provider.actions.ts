import { createAction, props } from '@ngrx/store';

export const loadProvider = createAction(
  '[PROVIDER_LOADED] ProviderLoaded',
  props<{ connection: any }>()
);

export const loadNetwork = createAction(
  '[NETWORK_LOADED] NetworkLoaded',
  props<{ chainId: number }>()
);

export const loadAccount = createAction(
  '[ACCOUNT_LOADED] AccountLoaded',
  props<{ account: string }>()
);

export const loadBalance = createAction(
  '[ETHER_BALANCE_LOADED] BalanceLoaded',
  props<{ balance: string }>()
);
