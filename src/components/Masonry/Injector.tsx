import { InjectorProps } from './types';

import isEqual from 'react-fast-compare';

import React, { memo } from 'react';

const InjectorComponent = ({
  defaultComponent: DefaultComponent,
  children,
  defaultProps,
  injectant: Injectant,
  injectantProps
}: InjectorProps) =>
  Injectant ? (
    <Injectant {...defaultProps} {...injectantProps}>
      {children}
    </Injectant>
  ) : (
    <DefaultComponent {...defaultProps}>{children}</DefaultComponent>
  );

export const Injector = memo(InjectorComponent, isEqual);
