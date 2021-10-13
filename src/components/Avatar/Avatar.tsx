import { AvatarProps } from './Avatar.props';

import FstImage from '../FstImage/FstImage';

import React from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';

const styles = StyleSheet.create({
  container: { width: 50, height: 50, borderRadius: 25 }
});
export default (props: AvatarProps) => (
  <TouchableOpacity
    disabled={!props.onPress}
    style={{ overflow: 'hidden' }}
    onPress={props.onPress}
    children={
      <FstImage {...props} source={props.source} style={[styles.container, props.style]} resizeMode="contain" />
    }
  />
);
