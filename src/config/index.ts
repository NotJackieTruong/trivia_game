import { Theme } from '@react-navigation/native';
export const CODE_DEFAULT = -200;
export const CODE_SUCCESS = 200;
export const ERROR_NETWORK_CODE = -100;
export const RESULT_CODE_PUSH_OUT = 401;
export const TIME_OUT = 20000;
export const STATUS_TIME_OUT = 'ECONNABORTED';
export const CODE_TIME_OUT = 408;
export const APP_MODE = {
  DEV: 'dev',
  PROD: 'prod',
  STAGING: 'staging'
};
export const BASE_URL = '123';
export const REG_PHONE = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;
export const REG_EMAIL =
  /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

export interface Colors {
  primary: string;

  background: string;

  card: string;

  text: string;

  border: string;

  notification: string;

  error: string;

  info: string;
}
export type AppTheme = Theme & { colors: Partial<Colors> };

export enum SLICE_NAME {
  APP = 'APP',
  LOGIN = 'LOGIN'
}

export const STRING_VALUE = {
  APP_MODE: 'APP_MODE'
};

export const TYPE_STORAGE = {
  TOKEN: 'token',
  ROLE: 'role'
};

export const ROLE = {
  PROVIDER: 'provider',
  SELLER: 'seller',
  ADMIN: 'admin'
};
