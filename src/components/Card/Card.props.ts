import { React } from 'react';
import { ViewStyle, StyleProp } from 'react-native';

export interface CardProps {
  style?: StyleProp<ViewStyle>;
  children: React.Element;
}
