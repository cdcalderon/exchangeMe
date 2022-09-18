import { loadProvider, loadNetwork, loadAccount } from './provider.actions';
import { Action } from '@ngrx/store';

export function providerReducer(state = {}, action: Action) {
  switch (action.type) {
    case loadProvider.type:
      return {
        ...state,
        connection: 'Test carlos',
        //connection: action.connection,
      };
    case loadNetwork.type:
      return {
        ...state,
        // chainId: action.chainId,
      };
    case loadAccount.type:
      return {
        ...state,
        // account: action.account,
      };

    default:
      return state;
  }
}
