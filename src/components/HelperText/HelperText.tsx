import { HelperTextProps } from './HelperText.prop';

import { Block } from '../Block/Block';
import { Text } from '../Text/Text';

import equals from 'react-fast-compare';
import Animated, { useAnimatedStyle } from 'react-native-reanimated';

import React, { memo, useEffect, useMemo, useState } from 'react';
import { StyleSheet } from 'react-native';

import { useMix, useRadian, useSharedTransition } from '#animated';
import { enhance } from '#common';
import { ColorDefault } from '#theme';

const styles = StyleSheet.create({
  container: {
    paddingTop: 3,
    paddingBottom: 4,
    justifyContent: 'center',
    alignItems: 'flex-start',
    width: '100%',
    overflow: 'hidden'
  },
  textInfo: {
    color: ColorDefault.info
  },
  textError: {
    color: ColorDefault.error
  },
  text: {
    fontWeight: 'normal'
  }
});

const HelperTextComponent = (props: HelperTextProps) => {
  const { visible = false, msg, type } = props;
  const [currentMessage, setCurrentMessage] = useState<string>(msg ?? '');
  const progress = useSharedTransition(visible);
  const translateY = useMix(progress, -5, 0);
  const translateX = useMix(progress, -5, 0);
  const opacity = useMix(progress, 0, 1);
  const rotateX = useRadian(useMix(progress, 90, 0));
  const textStyle = useMemo(
    () => enhance([styles.text, type === 'error' ? styles.textError : styles.textInfo]),
    [type]
  );
  useEffect(() => {
    if (msg) {
      setCurrentMessage(msg);
    }
  }, [msg]);

  const style = useAnimatedStyle(() => ({
    opacity: opacity.value,
    transform: [{ translateX: translateX.value }, { translateY: translateY.value }, { rotateX: rotateX.value }]
  }));

  return (
    <Block style={[styles.container]}>
      <Animated.View style={[style]}>
        <Text numberOfLines={1} style={[textStyle]}>
          {currentMessage}
        </Text>
      </Animated.View>
    </Block>
  );
};
export const HelperText = memo(HelperTextComponent, equals);
