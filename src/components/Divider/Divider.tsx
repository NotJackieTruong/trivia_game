import { DividerProps } from './Divider.props';

import { Block } from '../Block/Block';

import equals from 'react-fast-compare';

import React, { memo } from 'react';
import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  wrap: {
    width: '100%'
  }
});

const DividerComponent = (props: DividerProps) => {
  const { height = 1, bg = '#bbb' } = props;
  return <Block height={height * StyleSheet.hairlineWidth} color={bg} style={[styles.wrap, props.style]} />;
};
export const Divider = memo(DividerComponent, equals);
