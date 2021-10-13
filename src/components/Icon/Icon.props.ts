import { ImageStyle, StyleProp, ViewStyle } from 'react-native';

declare type Priority = 'low' | 'normal' | 'high';
export interface Source {
  uri?: string;
  headers?: {
    [key: string]: string;
  };
  priority?: Priority;
  cache?: Cache;
}

export interface IconProps {
  /**
   * Overwrite icon style
   * @default undefined
   */
  style?: StyleProp<ImageStyle>;

  /**
   * Overwrite wrap icon style
   * @default undefined
   */
  containerStyle?: StyleProp<ViewStyle>;

  /**
   * Icon type
   * @default undefined
   */
  source: Source | number;
}
