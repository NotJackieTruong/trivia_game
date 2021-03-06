import { ViewStyle, StyleProp } from 'react-native';

export interface DividerProps {
  /**
   * Background for divider
   * @default #bbb
   */
  bg?: string;

  /**
   * Height of divider
   * @default 1
   */
  height?: number;

  /**
   *
   */
  style?: StyleProp<ViewStyle>;
}
