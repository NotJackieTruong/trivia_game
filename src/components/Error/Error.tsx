import { Props } from './Error.props';

import { DebounceButton } from '../Button/Button';

import FastImage from 'react-native-fast-image';

import React from 'react';
import { Dimensions, StyleSheet, Text, View } from 'react-native';

import R from '#assets';
import { colors, fonts } from '#theme';

const { width } = Dimensions.get('window');
const Error = (props: Props) => (
  <View style={styles.container}>
    <FastImage source={R.images.img_error} style={styles.image} />
    <DebounceButton style={styles.button} onPress={props.reload}>
      <Text style={styles.textReload}>{R.strings().try_again}</Text>
    </DebounceButton>
  </View>
);
export default Error;

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  image: {
    width: width / 2,
    height: width / 2,
    resizeMode: 'contain'
  },
  button: {
    backgroundColor: colors.primary,
    paddingHorizontal: '10%',
    paddingVertical: 12,
    borderRadius: 50
  },
  textReload: {
    ...fonts.regular14,
    color: 'white'
  }
});
