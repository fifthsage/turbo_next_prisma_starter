export type COINONE_ORDER_SIDE = "BUY" | "SELL";
export type COINONE_ORDER_TYPE = "LIMIT" | "MARKET" | "STOP_LIMIT";
export type COINONE_ORDER_STATUS =
  | "LIVE"
  | "PARTIALLY_FILLED"
  | "PARTIALLY_CANCELED"
  | "FILLED"
  | "CANCELED"
  | "NOT_TRIGGERED"
  | "NOT_TRIGGERED_PARTIALLY_CANCELED"
  | "NOT_TRIGGERED_CANCELED"
  | "TRIGGERED"
  | "CANCELED_NO_ORDER"
  | "CANCELED_LIMIT_PRICE_EXCEED"
  | "CANCELED_UNDER_PRODUCT_UNIT";

export type COINONE_RESPONSE = {
  result: "success" | "error";
  error_code: number;
};

export type COINONE_ORDER_RESPONSE = {
  order_id: string;
} & COINONE_RESPONSE;

export type CONINONE_ORDER_RESPONSE = {
  order: COINONE_ORDER_ITEM;
} & COINONE_RESPONSE;

export type CONINONE_TICKER_RESPONSE = {
  server_time: number;
  tickers: COINONE_TICKER_ITEM[];
} & COINONE_RESPONSE;

export type COINONE_TICKER_ITEM = {
  quote_currency: string;
  target_currency: string;
  timestamp: number;
  high: number;
  low: number;
  first: number;
  last: number;
  quote_volume: number;
  target_volume: number;
  best_asks: { price: number; qty: number }[];
  best_bids: { price: number; qty: number }[];
  id: string;
};

export type COINONE_ORDER_ITEM = {
  order_id: string;
  type: string;
  quote_currency: string;
  target_currency: string;
  status: COINONE_ORDER_STATUS;
  side: COINONE_ORDER_SIDE;
  fee: number;
  fee_rate: number;
  average_executed_price: number;
  updated_at: number;
  ordered_at: number;
  price: number;
  original_qty: number;
  executed_qty: number;
  canceled_qty: number;
  remain_qty: number;
  limit_price: number;
  traded_amount: number;
  original_amount: number;
  canceled_amount: number;
  is_triggered: number;
  trigger_price: number;
};

export type COINONE_TRANSACTION = {
  id: string;
  timestamp: number;
  price: number;
  qty: number;
  is_seller_maker: boolean;
};

export type COINONE_TRADE_ITEM = {
  result: string;
  error_code: string;
  server_time: number;
  quote_currency: string;
  target_currency: string;
  transactions: COINONE_TRANSACTION[];
};

export type COINONE_BUY_MARKET_ORDER_PARAM = {
  access_token: string;
  nonce: string;
  quote_currency: string;
  target_currency: string;
  type: "MARKET";
  side: "BUY";
  amount;
  limit_price: number;
};

export type COINONE_SELL_MARKET_ORDER_PARAM = {
  access_token: string;
  nonce: string;
  quote_currency: string;
  target_currency: string;
  type: "MARKET";
  side: "SELL";
  qty: number;
  limit_price: number;
};
