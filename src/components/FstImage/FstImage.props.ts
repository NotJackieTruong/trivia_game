import { ImageStyle, Source } from 'react-native-fast-image';

import { ReactNode } from 'react';
import { StyleProp, ViewStyle } from 'react-native';

type ResizeMode = 'contain' | 'cover' | 'stretch' | 'center';
export interface ImageProps {
  children?: ReactNode;
  /**
   * Overwrite image style
   * @default undefined
   */
  style?: StyleProp<ImageStyle>;

  /**
   * Overwrite wrap image style
   * @default undefined
   */
  containerStyle?: StyleProp<ViewStyle>;

  /**
   * Source image(local)
   * @default undefined
   */
  source: Source | number;

  /**
   * Custom resizeMode
   * @default contain
   */
  resizeMode?: ResizeMode;

  tintColor?: string;
}
