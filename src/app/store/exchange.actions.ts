import { createAction, props } from '@ngrx/store';
import {
  ExchangeLoadedState,
  ExchangeOrderRequest,
  ExchangeOrderSuccess,
  ExchangeTokenBalanceLoadedState,
  ExchangeTransferRequest,
  ExchangeTransferSuccess,
} from './exchange.reducer';

export const loadExchange = createAction(
  '[EXCHANGE_LOADED] ExchangeLoaded',
  props<ExchangeLoadedState>()
);

export const loadExchangeToken1Balance = createAction(
  '[EXCHANGE_TOKEN_1_BALANCE_LOADED] ExchangeToken1BalanceLoaded',
  props<ExchangeTokenBalanceLoadedState>()
);

export const loadExchangeToken2Balance = createAction(
  '[EXCHANGE_TOKEN_2_BALANCE_LOADED] ExchangeToken2BalanceLoaded',
  props<ExchangeTokenBalanceLoadedState>()
);

export const transferRequested = createAction(
  '[TRANSFER_REQUESTED] TransferRequested',
  props<ExchangeTransferRequest>()
);

export const transferSuccess = createAction(
  '[TRANSFER_SUCCESS] TransferSuccess',
  props<ExchangeTransferSuccess>()
);

export const transferFailed = createAction(
  '[TRANSFER_FAILED] TransferFailed',
  props<ExchangeTransferRequest>()
);

export const newOrderCreated = createAction(
  '[NEW_ORDER_CREATED] NewOrderCreated',
  props<ExchangeOrderRequest>()
);

export const newOrderSuccess = createAction(
  '[NEW_ORDER_SUCCESS] NewOrderSuccess',
  props<ExchangeOrderSuccess>()
);

export const newOrderFailed = createAction(
  '[NEW_ORDER_FAILED] NewOrderFailed',
  props<ExchangeOrderRequest>()
);
