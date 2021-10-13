import { IconProps } from './Icon.props';

import { Block } from '../Block/Block';

import equals from 'react-fast-compare';
import FastImage, { FastImageProps, ImageStyle } from 'react-native-fast-image';

import * as React from 'react';

import { enhance } from '#common';

const ROOT: ImageStyle = {};

type IcProps = IconProps & FastImageProps;

const IconComponent = (props: IcProps) => {
  const { style: styleOverride = {}, source, containerStyle } = props;
  const style: ImageStyle = React.useMemo(() => enhance([ROOT, styleOverride]), [styleOverride]);
  return (
    <Block style={containerStyle}>
      <FastImage {...props} style={style} source={source} resizeMode="contain" />
    </Block>
  );
};
export const Icon = React.memo(IconComponent, equals);
