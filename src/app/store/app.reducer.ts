import * as provider from './provider.reducer';
import * as token from './token.reducer';
import * as exchange from './exchange.reducer';
import {
  ActionReducerMap,
  createFeatureSelector,
  createSelector,
} from '@ngrx/store';
import { get, groupBy, reject } from 'lodash';
import * as moment from 'moment';
import { ethers } from 'ethers';

const GREEN = '#25CE8F';
const RED = '#F45353';

export interface AppState {
  provider: provider.ProviderState;
  token: token.TokenState;
  exchange: exchange.ExchangeState;
}

export const appReducers: ActionReducerMap<AppState> = {
  token: token.tokenReducer,
  provider: provider.providerReducer,
  exchange: exchange.exchangeReducer,
};

export const getTokenState = createFeatureSelector<token.TokenState>('token');
export const getProviderState =
  createFeatureSelector<provider.ProviderState>('provider');
export const getExchangeState =
  createFeatureSelector<exchange.ExchangeState>('exchange');

// Exchange state
export const getAllOrdersSelector = createSelector(
  getExchangeState,
  getTokenState,
  (exchange, token) => {
    const tokens = token.contracts;
    let orders: any = openOrders(exchange);

    // Filter orders by selected tokens
    orders = orders.filter(
      (o) => o.tokenGet === tokens[0] || o.tokenGet === tokens[1]
    );
    orders = orders.filter(
      (o) => o.tokenGive === tokens[0] || o.tokenGive === tokens[1]
    );

    // Decorate orders
    orders = decorateOrderBookOrders(orders, tokens);

    // Group orders by "orderType"
    orders = groupBy(orders, 'orderType');

    // Fetch buy orders
    const buyOrders = get(orders, 'buy', []);

    // Sort buy orders by token price
    orders = {
      ...orders,
      buyOrders: buyOrders.sort((a, b) => b.tokenPrice - a.tokenPrice),
    };

    // Fetch sell orders
    const sellOrders = get(orders, 'sell', []);

    // Sort sell orders by token price
    orders = {
      ...orders,
      sellOrders: sellOrders.sort((a, b) => b.tokenPrice - a.tokenPrice),
    };

    return orders;
  }
);

export const getTokensWithAccoutSelector = createSelector(
  getTokenState,
  getProviderState,
  (token, provider) => {
    return {
      tokens: token.contracts,
      account: provider.account,
    };
  }
);

// Token state
export const getSymbolsSelector = createSelector(
  getTokenState,
  token.getSymbols
);

export const filledOrdersSelector = createSelector(
  getExchangeState,
  getTokenState,
  (exchange, token) => {
    const tokens = token.contracts;
    if (!tokens[0] || !tokens[1]) {
      return;
    }

    let orders: any = get(exchange, 'filledOrders.data', []);

    // Filter orders by selected tokens
    orders = orders.filter(
      (o) => o.tokenGet === tokens[0] || o.tokenGet === tokens[1]
    );
    orders = orders.filter(
      (o) => o.tokenGive === tokens[0] || o.tokenGive === tokens[1]
    );

    // Sort orders by time ascending for price comparison
    orders = orders.sort((a, b) => a.timestamp - b.timestamp);

    // Decorate the orders
    orders = decorateFilledOrders(orders, tokens);

    // Sort orders by date descending for display
    orders = orders.sort((a, b) => b.timestamp - a.timestamp);

    return orders;
  }
);

export const myOpenOrdersSelector = createSelector(
  getExchangeState,
  getTokensWithAccoutSelector,
  (exchange, tokensAccount) => {
    const tokens = tokensAccount.tokens;
    if (!tokens[0] || !tokens[1]) {
      return;
    }

    let orders: any = openOrders(exchange);

    // Filter orders created by current account
    orders = orders.filter((o) => o.user === tokensAccount.account);

    // Filter orders by token addresses
    orders = orders.filter(
      (o) => o.tokenGet === tokens[0] || o.tokenGet === tokens[1]
    );
    orders = orders.filter(
      (o) => o.tokenGive === tokens[0] || o.tokenGive === tokens[1]
    );

    // Decorate orders - add display attributes
    orders = decorateMyOpenOrders(orders, tokens);

    // Sort orders by date descending
    orders = orders.sort((a, b) => b.timestamp - a.timestamp);

    return orders;
  }
);

export const myFilledOrdersSelector = createSelector(
  getExchangeState,
  getTokensWithAccoutSelector,
  (exchange, tokensAccount) => {
    const tokens = tokensAccount.tokens;
    if (!tokens[0] || !tokens[1]) {
      return;
    }

    let orders: any = get(exchange, 'filledOrders.data', []);
    // Find our orders
    orders = orders.filter(
      (o) =>
        o.user === tokensAccount.account || o.creator === tokensAccount.account
    );
    // Filter orders for current trading pair
    orders = orders.filter(
      (o) => o.tokenGet === tokens[0] || o.tokenGet === tokens[1]
    );
    orders = orders.filter(
      (o) => o.tokenGive === tokens[0] || o.tokenGive === tokens[1]
    );

    // Sort by date descending
    orders = orders.sort((a, b) => b.timestamp - a.timestamp);

    // Decorate orders - add display attributes
    orders = decorateMyFilledOrders(orders, tokensAccount.account, tokens);

    return orders;
  }
);

// -------------------------------------------------------------------------------------
// Helpers
const openOrders = (exchange) => {
  const all = get(exchange, 'allOrders.data', []);
  const filled = get(exchange, 'filledOrders.data', []);
  const cancelled = get(exchange, 'cancelledOrders.data', []);

  const openOrders = reject(all, (order) => {
    const orderFilled = filled.some(
      (o) => o.id.toString() === order.id.toString()
    );
    const orderCancelled = cancelled.some(
      (o) => o.id.toString() === order.id.toString()
    );
    return orderFilled || orderCancelled;
  });
  return openOrders;
};

const decorateOrder = (order, tokens) => {
  let token0Amount, token1Amount;

  // Note: PCHO should be considered token0, JEDY or CHIH is considered token1
  // Example: Giving JEDY in exchange for PCHO
  if (order.tokenGive === tokens[1]) {
    token0Amount = order.amountGive; // The amount of PCHO we are giving
    token1Amount = order.amountGet; // The amount of JEDY we want...
  } else {
    token0Amount = order.amountGet; // The amount of DApp we want
    token1Amount = order.amountGive; // The amount of JEDY we are giving...
  }

  // Calculate token price to 5 decimal places
  const precision = 100000;
  let tokenPrice = token1Amount / token0Amount;
  tokenPrice = Math.round(tokenPrice * precision) / precision;

  return {
    ...order,
    token1Amount: ethers.utils.formatUnits(token1Amount, 'ether'),
    token0Amount: ethers.utils.formatUnits(token0Amount, 'ether'),
    tokenPrice,
    formattedTimestamp: moment.unix(order.timestamp).format('h:mm:ssa d MMM D'),
  };
};

const decorateOrderBookOrders = (orders, tokens) => {
  return orders.map((order) => {
    order = decorateOrder(order, tokens);
    order = decorateOrderBookOrder(order, tokens);
    return order;
  });
};

const decorateOrderBookOrder = (order, tokens) => {
  const orderType = order.tokenGive === tokens[1] ? 'buy' : 'sell';

  return {
    ...order,
    orderType,
    orderTypeClass: orderType === 'buy' ? GREEN : RED,
    orderFillAction: orderType === 'buy' ? 'sell' : 'buy',
  };
};

const decorateFilledOrders = (orders, tokens) => {
  // Track previous order to compare history
  let previousOrder = orders[0];

  return orders.map((order) => {
    // decorate each individual order
    order = decorateOrder(order, tokens);
    order = decorateFilledOrder(order, previousOrder);
    previousOrder = order; // Update the previous order once it's decorated
    return order;
  });
};

const decorateFilledOrder = (order, previousOrder) => {
  return {
    ...order,
    tokenPriceClass: tokenPriceClass(order.tokenPrice, order.id, previousOrder),
  };
};

const tokenPriceClass = (tokenPrice, orderId, previousOrder) => {
  // Show green price if only one order exists
  if (previousOrder.id === orderId) {
    return GREEN;
  }

  // Show green price if order price higher than previous order
  // Show red price if order price lower than previous order
  if (previousOrder.tokenPrice <= tokenPrice) {
    return GREEN; // success
  } else {
    return RED; // danger
  }
};

const decorateMyOpenOrders = (orders, tokens) => {
  return orders.map((order) => {
    order = decorateOrder(order, tokens);
    order = decorateMyOpenOrder(order, tokens);
    return order;
  });
};

const decorateMyOpenOrder = (order, tokens) => {
  let orderType = order.tokenGive === tokens[1] ? 'buy' : 'sell';

  return {
    ...order,
    orderType,
    orderTypeClass: orderType === 'buy' ? GREEN : RED,
  };
};

const decorateMyFilledOrders = (orders, account, tokens) => {
  return orders.map((order) => {
    order = decorateOrder(order, tokens);
    order = decorateMyFilledOrder(order, account, tokens);
    return order;
  });
};

const decorateMyFilledOrder = (order, account, tokens) => {
  const myOrder = order.creator === account;

  let orderType;
  if (myOrder) {
    orderType = order.tokenGive === tokens[1].address ? 'buy' : 'sell';
  } else {
    orderType = order.tokenGive === tokens[1].address ? 'sell' : 'buy';
  }

  return {
    ...order,
    orderType,
    orderClass: orderType === 'buy' ? GREEN : RED,
    orderSign: orderType === 'buy' ? '+' : '-',
  };
};
