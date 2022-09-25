import { loadProvider, loadNetwork, loadAccount } from './provider.actions';
import { Action, createReducer, on } from '@ngrx/store';

export interface ProviderState {
  connection: any;
  chainId: number;
  account: string;
}

export const initialState: ProviderState = {
  connection: {},
  chainId: 0,
  account: '',
};

export const providerReducer = createReducer(
  initialState,
  on(loadProvider, (state, { connection }) => ({ ...state, connection })),
  on(loadNetwork, (state, { chainId }) => ({ ...state, chainId })),
  on(loadAccount, (state, { account }) => ({ ...state, account }))
);

// export function providerReducer(state = {}, action: Action) {
//   switch (action.type) {
//     case loadProvider.type:
//       return {
//         ...state,
//         connection: 'Test carlos',
//         //connection: action.connection,
//       };
//     case loadNetwork.type:
//       return {
//         ...state,
//         // chainId: action.chainId,
//       };
//     case loadAccount.type:
//       return {
//         ...state,
//         // account: action.account,
//       };

//     default:
//       return state;
//   }
// }
