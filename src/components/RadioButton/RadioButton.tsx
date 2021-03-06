import { RadioButtonProps } from './RadioButton.props';

import equals from 'react-fast-compare';
import Animated, { useAnimatedStyle } from 'react-native-reanimated';

import React, { memo, useCallback, useMemo, useState } from 'react';
import { StyleSheet, TouchableWithoutFeedback } from 'react-native';

import { useInterpolate, useInterpolateColor, useSharedTransition } from '#animated';
import { onCheckType } from '#common';

const SIZE = 30;
const ACTIVE_COLOR = '#ff00a9';
const UN_ACTIVE_COLOR = '#999999';
const STROKE_WIDTH = 3;
const styles = StyleSheet.create({
  wrap: {
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative'
  },
  dot: {
    position: 'absolute',
    alignSelf: 'center'
  }
});

const RadioButtonComponent = (props: RadioButtonProps) => {
  const {
    initialValue = false,
    activeColor = ACTIVE_COLOR,
    unActiveColor = UN_ACTIVE_COLOR,
    strokeWidth = STROKE_WIDTH,
    sizeDot = SIZE - 10,
    value,
    onToggle
  } = props;
  const [localValue, setLocalValue] = useState<boolean>(initialValue);
  const progress = useSharedTransition(value ?? localValue, { duration: 200 });
  const size = useInterpolate(progress, [0, 1], [0, sizeDot - strokeWidth]);
  const color = useInterpolateColor(progress, [0, 1], [unActiveColor, activeColor]);

  const _onPress = useCallback(() => {
    if (onToggle && onCheckType(onToggle, 'function')) {
      onToggle(!value);
    } else {
      setLocalValue(v => !v);
    }
  }, [onToggle, value]);

  const wrapStyle = useMemo(
    () => ({
      width: sizeDot + 10,
      height: sizeDot + 10,
      borderRadius: (sizeDot + 10) / 2,
      borderWidth: strokeWidth
    }),
    [sizeDot, strokeWidth]
  );
  const wrapAnimaStyle = useAnimatedStyle(() => ({
    borderColor: color.value as string
  }));
  const dotStyle = useAnimatedStyle(() => ({
    width: size.value,
    height: size.value,
    borderRadius: (sizeDot - strokeWidth) / 2,
    backgroundColor: color.value as string
  }));

  return (
    <TouchableWithoutFeedback onPress={_onPress}>
      <Animated.View style={[styles.wrap, wrapStyle, wrapAnimaStyle]}>
        <Animated.View pointerEvents="none" style={[styles.dot, dotStyle]} />
      </Animated.View>
    </TouchableWithoutFeedback>
  );
};

export const RadioButton = memo(RadioButtonComponent, equals);
