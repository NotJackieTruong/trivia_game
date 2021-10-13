import { StackViewProps } from './StackView.props';

import isEqual from 'react-fast-compare';
import Animated from 'react-native-reanimated';

import React, { forwardRef, memo } from 'react';

const StackViewComponent = forwardRef(
  ({ children, ...rest }: StackViewProps, ref: React.ForwardedRef<Animated.ScrollView>) => (
    <Animated.ScrollView
      ref={ref}
      showsVerticalScrollIndicator={false}
      showsHorizontalScrollIndicator={false}
      scrollEventThrottle={16}
      {...rest}>
      {children}
    </Animated.ScrollView>
  )
);

export const StackView = memo(StackViewComponent, isEqual);
