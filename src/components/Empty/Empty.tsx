import { EmptyProps } from './Empty.props';

import { Block } from '../Block/Block';
import FstImage from '../FstImage/FstImage';
import { Text } from '../Text/Text';

import isEqual from 'react-fast-compare';

import React, { memo, useState } from 'react';
import { Dimensions, StyleSheet } from 'react-native';

import R from '#assets';
import { colors, spacing } from '#theme';

const { width, height } = Dimensions.get('window');
const Empty = memo((props: EmptyProps) => {
  const [mgTop, setMgTop] = useState(height / 5);
  return (
    <Block
      onLayout={event => {
        setMgTop(event.nativeEvent.layout.height);
      }}
      block
      justifyContent="center"
      alignItems="center"
      marginTop={mgTop}>
      <FstImage
        source={props.sourceImage || R.images.ic_search_not_found}
        style={styles.imageEmpty}
        resizeMode="contain"
      />
      <Text color={colors.text.lighter} marginTop={spacing.small} children={props.msg || 'Không tìm thấy kết quả'} />
    </Block>
  );
}, isEqual);
export default Empty;

const styles = StyleSheet.create({
  imageEmpty: {
    width: width / 2.5,
    aspectRatio: 1
  }
});
