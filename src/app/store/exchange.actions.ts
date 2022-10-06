import { createAction, props } from '@ngrx/store';
import {
  ExchangeLoadedState,
  ExchangeOrderCancelFailed,
  ExchangeOrderCancelRequest,
  ExchangeOrderCancelSuccess,
  ExchangeOrderFillFailed,
  ExchangeOrderFillRequest,
  ExchangeOrderRequest,
  ExchangeOrdersCancelledLoaded,
  ExchangeOrdersFilledLoaded,
  ExchangeOrdersLoaded,
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

// Deposits
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

// create Orders
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

// Orders Loaded
export const allOrdersLoaded = createAction(
  '[ALL_ORDERS_LOADED] AllOrdersLoaded',
  props<ExchangeOrdersLoaded>()
);

export const ordersCancelledLoaded = createAction(
  '[CANCELLED_ORDERS_LOADED] CancelOrdersLoaded',
  props<ExchangeOrdersCancelledLoaded>()
);

export const ordersFilledLoaded = createAction(
  '[FILLED_ORDERS_LOADED] FilledOrdersLoaded',
  props<ExchangeOrdersFilledLoaded>()
);

export const orderCancelRequest = createAction(
  '[ORDER_CANCEL_REQUEST] OrderCancelRequest',
  props<ExchangeOrderCancelRequest>()
);

export const orderCancelFailed = createAction(
  '[ORDER_CANCEL_FAILED] OrderCancelFailed',
  props<ExchangeOrderCancelFailed>()
);

export const orderCancelSuccess = createAction(
  '[ORDER_CANCEL_SUCCESS] OrderCancelSuccess',
  props<ExchangeOrderCancelSuccess>()
);

export const orderFillRequest = createAction(
  '[ORDER_FILL_REQUEST] OrderFillRequest',
  props<ExchangeOrderFillRequest>()
);

export const orderFillFailed = createAction(
  '[ORDER_FILL_FAIL] OrderFillFailed',
  props<ExchangeOrderFillFailed>()
);
