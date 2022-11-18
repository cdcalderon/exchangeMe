import {
  loadProvider,
  loadNetwork,
  loadAccount,
  loadBalance,
  loadChart,
} from './provider.actions';
import { Action, createReducer, on } from '@ngrx/store';

export interface ProviderState {
  connection: any;
  chainId: number;
  account: string;
  balance: string;
  chartMode: string;
}

export const initialState: ProviderState = {
  connection: {},
  chainId: 0,
  account: '',
  balance: '',
  chartMode: 'apex',
};

export const providerReducer = createReducer(
  initialState,
  on(loadProvider, (state, { connection }) => ({ ...state, connection })),
  on(loadNetwork, (state, { chainId }) => ({ ...state, chainId })),
  on(loadAccount, (state, { account }) => ({ ...state, account })),
  on(loadBalance, (state, { balance }) => ({ ...state, balance })),
  on(loadChart, (state, { chartMode }) => ({ ...state, chartMode }))
);
