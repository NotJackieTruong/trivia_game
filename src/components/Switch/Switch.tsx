import { SwitchProps } from './Switch.props';
import { Switch as SwitchAndroid } from './SwitchAndroid';
import { Switch as SwitchIOS } from './SwitchIOS';

import isEqual from 'react-fast-compare';

import React, { memo } from 'react';

const SwitchComponent = (props: SwitchProps) =>
  // eslint-disable-next-line react/destructuring-assignment
  props.type === 'android' ? <SwitchAndroid {...props} /> : <SwitchIOS {...props} />;
export const Switch = memo(SwitchComponent, isEqual);
