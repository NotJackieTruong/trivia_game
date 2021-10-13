import { FABProps } from './FAB.props';
import { FABDefault } from './components/FABDefault/FABDefault';
import { FABGroup } from './components/FABGroup/FABGroup';

import equals from 'react-fast-compare';

import React, { memo } from 'react';

import R from '#assets';

const FABComponent = (props: FABProps) => {
  const { type = 'default', icon = R.images.ic_plus, style = {} } = props;
  return type === 'default' ? (
    <FABDefault {...{ ...props, icon, style }} />
  ) : (
    <FABGroup {...{ ...props, icon, style }} />
  );
};
export const FAB = memo(FABComponent, equals);
