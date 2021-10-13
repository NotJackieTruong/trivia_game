import { Circular } from './Circular';
import { ProgressCircleProps } from './ProgressCircle.props';

import { Block } from '../../../Block/Block';
import { Text } from '../../../Text/Text';

import equals from 'react-fast-compare';

import React, { memo, useMemo } from 'react';
import { StyleSheet } from 'react-native';

import { enhance } from '#common';

const styles = StyleSheet.create({
  container: {
    paddingVertical: 5,
    paddingHorizontal: 5,
    justifyContent: 'center',
    alignItems: 'center'
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'center'
  },
  textProgress: {
    position: 'absolute',
    zIndex: 3,
    alignSelf: 'center'
  }
});

export const ProgressCircleComponent = (props: ProgressCircleProps) => {
  const { bg, fg, radius, progress, strokeWidth, showTextProgress, textProgressStyle } = props;
  const textStyles = useMemo(() => enhance([styles.textProgress, textProgressStyle]), [textProgressStyle]);
  const renderText = (): string => {
    if (progress < 0) {
      return `${0}`;
    }
    if (progress > 100) {
      return `${100}`;
    }
    return `${progress}`;
  };
  return (
    <Block style={styles.container}>
      {showTextProgress && <Text style={[textStyles]} text={renderText()} />}
      <Block>
        <Circular strokeWidth={strokeWidth} bg={bg} fg={fg} radius={radius} progress={progress} />
      </Block>
      <Block style={styles.overlay}>
        <Block
          style={{
            width: radius * 2 - strokeWidth,
            height: radius * 2 - strokeWidth,
            borderRadius: radius + strokeWidth / 2,
            backgroundColor: bg
          }}
        />
      </Block>
    </Block>
  );
};
export const ProgressCircle = memo(ProgressCircleComponent, equals);
