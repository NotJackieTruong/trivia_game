import { ProgressLinearProps } from './ProgressLinear.props';

import equals from 'react-fast-compare';
import Animated, { useAnimatedStyle, useDerivedValue } from 'react-native-reanimated';

import React, { memo, useState } from 'react';
import { LayoutChangeEvent, StyleSheet } from 'react-native';

import { sharedTiming, useInterpolate, useShareClamp } from '#animated';

const styles = StyleSheet.create({
  bg: {
    width: '100%',
    flex: 1,
    height: 4,
    backgroundColor: '#dbdbdb',
    marginVertical: 3,
    borderRadius: 50,
    overflow: 'hidden'
  },
  fg: {
    backgroundColor: '#0057e7',
    borderRadius: 50,
    flex: 1
  }
});

export const ProgressLinearComponent = (props: ProgressLinearProps) => {
  const { progress } = props;

  const [widthProgress, setWidthProgress] = useState(0);

  const progressAnimated = useDerivedValue(() => sharedTiming(progress));
  const actualProgress = useShareClamp(progressAnimated, 0, 100);
  const translateX = useInterpolate(actualProgress, [0, 100], [-widthProgress, 0]);

  const _onLayoutBg = (e: LayoutChangeEvent) => {
    setWidthProgress(e.nativeEvent.layout.width);
  };

  const foregroundStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: translateX.value }]
  }));

  return (
    <Animated.View onLayout={_onLayoutBg} style={[styles.bg]}>
      <Animated.View style={[styles.fg, foregroundStyle]} />
    </Animated.View>
  );
};

export const ProgressLinear = memo(ProgressLinearComponent, equals);
