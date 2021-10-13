/* eslint-disable camelcase */

import { SliderLinear } from './SliderLinear';
import { SliderRange } from './SliderRange';
import { SliderProps } from './type';

import isEqual from 'react-fast-compare';

import React, { memo } from 'react';

const SliderComponent = (props: SliderProps) =>
  props.type === 'range' ? <SliderRange {...props} /> : <SliderLinear {...props} />;

export const Slider = memo(SliderComponent, isEqual);
