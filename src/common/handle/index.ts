import { StyleSheet } from 'react-native';

export const enhance = (arrStyle: Array<any>) => StyleSheet.flatten(arrStyle);

export const checkKeyInObject = (T: any, key: string) => Object.keys(T).includes(key);
