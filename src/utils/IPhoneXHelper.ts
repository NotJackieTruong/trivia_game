import { Dimensions, Platform, StatusBar } from 'react-native';

export function isIPhoneX() {
  const { width, height } = Dimensions.get('window');
  return (
    Platform.OS === 'ios' &&
    !Platform.isPad &&
    !Platform.isTVOS &&
    (height === 812 || width === 812 || height === 896 || width === 896)
  );
}

export function ifIPhoneX(iPhoneXStyle, regularStyle) {
  if (isIPhoneX()) {
    return iPhoneXStyle;
  }
  return regularStyle;
}

export function getStatusBarHeight(safe) {
  return Platform.select({
    ios: ifIPhoneX(safe ? 44 : 30, 20),
    android: StatusBar.currentHeight,
    default: 0
  });
}

export function getBottomSpace() {
  return isIPhoneX() ? 34 : 0;
}
