import { Linking } from 'react-native';

import { BASE_URL, DEEP_LINK_TYPE, REG_EMAIL, REG_PHONE } from '#config';

export function validatePhoneNumber(phone: string) {
  if (!phone) {
    return false;
  }
  return REG_PHONE.test(phone);
}

export function validateEmail(email: string) {
  if (!email) {
    return false;
  }
  return REG_EMAIL.test(email);
}

export function jsonToArray(jsonData: any) {
  const result = [];
  for (const i in jsonData) {
    result.push(jsonData[i]);
  }
  return result;
}

export function deepLink(type: number, payload: any) {
  switch (type) {
    case DEEP_LINK_TYPE.PHONE: {
      Linking.openURL(`tel:${payload}`);
      return;
    }
    case DEEP_LINK_TYPE.SMS: {
      Linking.openURL(`sms:${payload}`);
      return;
    }
    case DEEP_LINK_TYPE.SETTINGS: {
      Linking.openSettings();
      return;
    }
    case DEEP_LINK_TYPE.DIRECTION: {
      Linking.openURL(
        `https://www.google.com/maps/dir/?api=1&destination=${payload.lat},${payload.lng}&travelmode=driving`
      );
    }
  }
}

export function getUrlNextPage(url: string) {
  return url.substring(BASE_URL.length, url.length);
}

export const maxLength = (maxLength: number, msg: string) => (value: string | undefined | null) =>
  value && value.length > maxLength ? msg : undefined;

export const minLength4 = (value: string | undefined | null) => (value && value.length < 4 ? 'Must be' : undefined);

export const minValue = (min: number) => (value: number) =>
  value && value < min ? `Must be at least ${min}` : undefined;

export const number = (msg: string) => (value: string | undefined | null) =>
  value && isNaN(Number(value)) ? msg : undefined;

export const isEmail = (value: string | undefined | null) => {
  if (!value) {
    return false;
  }
  return !/^[a-z][a-z0-9%_\.]{3,32}@[a-z0-9]{3,}(\.[a-z]{3,4}){1,2}$/i.test(value);
};

export const strongPassword = (value: string | undefined | null) =>
  value && !/^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[\W])(?!.*['"]).{8,}$/.test(value)
    ? 'Must like Abc@1234'
    : undefined;

export const normalizePhone = (value: string | undefined | null) => {
  if (!value) {
    return value;
  }

  const onlyNum = value.replace(/[^\d]/g, '');
  if (onlyNum.length <= 3) {
    return onlyNum;
  }
  if (onlyNum.length <= 7) {
    return `${onlyNum.slice(0, 4)}-${onlyNum.slice(4)}`;
  }
  return `${onlyNum.slice(0, 4)}-${onlyNum.slice(4, 7)}-${onlyNum.slice(7, 11)}`;
};
