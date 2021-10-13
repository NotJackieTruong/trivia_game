import { CardProps } from './Card.props';

import isEqual from 'react-fast-compare';

import React, { memo } from 'react';
import { Platform, StyleSheet, View } from 'react-native';

const styles = StyleSheet.create({
  container: {
    // marginHorizontal: 8,
    borderWidth: 0.2,
    borderRadius: 6,
    backgroundColor: 'white',
    shadowOffset: { width: 0, height: 3 },
    shadowColor: 'black',
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: Platform.OS === 'android' ? 3 : 0,
    borderColor: 'white',
    paddingHorizontal: 14,
    marginBottom: 2
  }
});

const CardComponent = ({ style, children }: CardProps) => <View style={[styles.container, style]}>{children}</View>;

export const Card = memo(CardComponent, isEqual);
