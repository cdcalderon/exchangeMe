import { Store } from '@ngrx/store';
import * as actions from './provider.actions';
import * as tokenActions from './token.actions';
import { ethers } from 'ethers';
import TokenJson from '../../abis/Token.json';
declare let window: any;
import * as _ from 'lodash';
import { Token } from '../../typechain-types';

export const loadProvider = (store: Store) => {
  let connection = new ethers.providers.Web3Provider(window.ethereum);
  const clonedConnection = _.cloneDeep(connection);
  console.log('clonec conneciton,,,,,  ', clonedConnection);
  store.dispatch(actions.loadProvider({ connection: 'clonedConnection' }));

  return connection;
};

export const loadNetwork = async (
  provider: ethers.providers.Web3Provider,
  store: Store
) => {
  const { chainId } = await provider.getNetwork();
  store.dispatch(actions.loadNetwork({ chainId }));

  return chainId;
};

export const loadAccount = async (store: Store) => {
  const accounts = await window.ethereum.request({
    method: 'eth_requestAccounts',
  });
  const account = ethers.utils.getAddress(accounts[0]);

  store.dispatch(actions.loadAccount({ account }));

  return account;
};

// export const loadToken = async (
//   provider: ethers.providers.Web3Provider,
//   address: string,
//   store: Store
// ) => {
//   const token = new ethers.Contract(address, TokenJson.abi, provider) as Token;
//   const symbol = await token.symbol();
//   store.dispatch(
//     tokenActions.loadToken({ loaded: true, contract: 'test', symbol: symbol })
//   );

//   return token;
// };
