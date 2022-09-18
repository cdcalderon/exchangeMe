import { loadProvider, loadNetwork, loadAccount } from './provider.actions';
import { Action, createReducer, on } from '@ngrx/store';

export interface State {
  connection: string;
}

export const initialState: State = {
  connection: '',
};

export const providerReducer = createReducer(
  initialState,
  on(loadProvider, (state) => ({ ...state, connection: 'test' })),
  on(loadNetwork, (state) => state),
  on(loadAccount, (state) => state)
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
