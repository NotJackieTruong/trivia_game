import { StyleProp, TextStyle, ViewStyle } from 'react-native';

export interface ButtonProps {
  title?: string;
  isLoading?: boolean;
  style?: StyleProp<ViewStyle>;
  styleText?: StyleProp<ViewStyle>;
  // eslint-disable-next-line no-undef
  icon?: JSX.Element;
  disabled?: boolean;
  onPress: () => void;
  children?: any;
  textStyle?: StyleProp<TextStyle>;
  activeOpacity?: number;
  preset?: string;
}
