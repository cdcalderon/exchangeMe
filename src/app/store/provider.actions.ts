import { createAction } from '@ngrx/store';

export const loadProvider = createAction('[PROVIDER_LOADED] ProviderLoaded');

export const loadNetwork = createAction('[NETWORK_LOADED] NetworkLoaded');

export const loadAccount = createAction('[ACCOUNT_LOADED] AccountLoaded');
