import { presets } from './Wallpaper.presets';
import { WallpaperProps } from './Wallpaper.props';

import FstImage from '../FstImage/FstImage';

import equals from 'react-fast-compare';

import React, { memo, useMemo } from 'react';
import { ImageStyle, StyleProp, useWindowDimensions } from 'react-native';

import R from '#assets';
import { enhance } from '#common';

const WallpaperComponent = ({
  preset = 'stretch',
  style: styleOverride,
  backgroundImage = R.images.img_background
}: WallpaperProps) => {
  const { height, width } = useWindowDimensions();
  const presetToUse = presets[preset];
  const style = useMemo<StyleProp<ImageStyle>>(
    () => enhance([presetToUse, { width, height }, styleOverride]),
    [presetToUse, width, height, styleOverride]
  );

  return <FstImage containerStyle={presets[preset]} source={backgroundImage} style={style} />;
};
export const Wallpaper = memo(WallpaperComponent, equals);
