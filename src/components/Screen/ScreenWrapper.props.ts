import { Edge } from 'react-native-safe-area-context';
import React from 'react';
import { StyleProp, ViewStyle } from 'react-native';

export interface ScreenWrapperProps {
  /**
   * Children of Screen
   */
  children: React.ReactNode;
  /**
   * show dialogLoading
   */
  isLoading?: boolean;
  /**
   * show component Error
   */
  isError?: object | boolean | any;
  /**
   * back button
   */
  back?: boolean;
  /**
   * rightComponent
   */
  rightComponent?: React.ReactNode;
  /**
   * leftComponent
   */
  leftComponent?: React.ReactNode;
  /**
   * Title thanh header
   */
  titleHeader?: string;

  reload?: () => void;

  onBack?: () => void;

  header?: React.ReactNode;

  dialogLoading?: boolean;

  /**
   * Overwrite style of screen
   * @default undefined
   */
  style?: StyleProp<ViewStyle>;
  /**
   * Color of Screen
   * @default transparent
   */
  backgroundColor?: string;
  /**
   * Status bar style
   * @default dark-content
   */
  statusBar?: 'light-content' | 'dark-content';

  /**
   * Using safe area on ios
   * @default false
   */
  unsafe?: boolean;

  /**
   * Visibility status bar
   * @default true
   */
  hidden?: boolean;

  /**
   * Color of status bar for both Android/IOS
   */
  statusColor?: string;

  /**
   * Enable to draw behind status bar android
   * @default false
   */
  draw?: boolean;

  /**
   * Color of inset bottom IPhone
   * @default #ffffff
   */
  bottomInsetColor?: string;

  /**
   * Color of inset left IPhone
   * @default #ffffff
   */
  leftInsetColor?: string;

  /**
   * Color of inset left IPhone
   * @default #ffffff
   */
  rightInsetColor?: string;

  /**
   * Show vertical indicator or not (using when scroll equal true)
   * @default false
   */
  showVertical?: boolean;

  /**
   * Show horizontal indicator or not (using when scroll equal true)
   * @default false
   */
  showHorizontal?: boolean;

  /**
   * Using scroll content
   * @default false
   */
  scroll?: boolean;

  /**
   * Inset for safe area view
   * @default undefined
   */
  forceInset?: Edge[];
}
