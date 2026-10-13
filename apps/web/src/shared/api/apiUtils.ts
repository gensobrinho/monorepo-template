import { IApiConfig } from './types/IApiConfig';

export const DEFAULT_CONFIG_EXAMPLE_API: IApiConfig = {
  baseURL: import.meta.env.VITE_API_URL ?? '',
  headers: {
    'Content-Type': 'application/json',
    'Cache-Control': 'no-cache',
  },
  timeout: 5000,
};

export const EXAMPLE_API = {
  DEFAULT_REQUEST_CONFIG: DEFAULT_CONFIG_EXAMPLE_API,
  ENTRY_POINTS: {
    GET_TOKEN: '/token',
  },
};

export const AUTH_API = {
  ENTRY_POINTS: {
    POST_LOGIN: '/auth/login',
    GET_USER_INFO: '/auth/me',
  },
} as const;

export const DEMO_API = {
  ENTRY_POINTS: {
    GET_ITEMS: '/demo',
    CREATE_ITEM: '/demo',
    UPDATE_ITEM: '/demo',
    DELETE_ITEM: '/demo',
  },
} as const;

export const USER_API = {
  ENTRY_POINTS: {
    GET_USERS: '/users',
    CREATE_USER: '/users',
    UPDATE_USER: '/users',
    DELETE_USER: '/users',
    CHANGE_PASSWORD: '/users/me/password',
  },
} as const;
