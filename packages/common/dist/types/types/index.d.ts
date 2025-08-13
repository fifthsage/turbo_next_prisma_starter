export * from "./juso.js";
export * from "./map.js";
export * from "./storage.js";
export * from "./public.js";
export * from "./dayjs-plugins.js";

/* eslint-disable @typescript-eslint/no-explicit-any */
declare global {
  interface Window {
    gtag: any;
  }
}

export type OptionItem<T = string> = {
  text: string;
  value: T;
};

export type WithDescription<T = string> = T & {
  description?: string | null;
};

export type WithCheck<T = string> = T & {
  checked: boolean;
};

export type WithSelect<T = string> = T & {
  selected: boolean;
};

export type WithIndex<T = string> = T & {
  index: number;
};

export type JsonDatabaseItem<T = string> = OptionItem<T>;
export type RecentlyUsedItem = WithDescription<OptionItem>;

export interface Storage {
  path: string;
  fullPath: string;
  id: string;
}

export interface LayoutProps {
  fluid?: boolean;
  fill?: boolean;
}

export interface APIResponse<T = unknown> {
  data?: T | null;
  message?: string | null;
  status: "OK" | "FAIL";
}

export interface WithAggregate<T> {
  items: T[];
  count: number;
  isFirst: boolean;
  isLast: boolean;
}

export interface AuthAPIResponse<T = unknown> {
  user: T;
  accessToken: string;
}

export interface NextFetchRequestInit extends RequestInit {
  next?: {
    revalidate?: number;
    tags?: string[];
  };
}

//EnvironmentType Types
export type EnvironmentType =
  | "local"
  | "development"
  | "production"
  | "staging";
