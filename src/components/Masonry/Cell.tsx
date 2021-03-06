import { Injector } from './Injector';
import { CellProps } from './types';

import isEqual from 'react-fast-compare';
import FastImage from 'react-native-fast-image';

import React, { memo, useMemo, useCallback } from 'react';
import { View, TouchableOpacity, StyleProp, ImageStyle, ImageProps } from 'react-native';

const CellComponent = ({
  onPress,
  containerImageStyle,
  data,
  width,
  height,
  uri,
  column,
  dimensions,
  renderFooter,
  renderHeader
}: CellProps) => {
  const dataBase = useMemo(
    () => ({ uri, width, height, data, column, actualSize: dimensions }),
    [uri, width, height, data, column, dimensions]
  );
  const _onPress = useCallback(() => {
    if (typeof onPress === 'function') {
      onPress(dataBase);
    }
  }, [onPress, dataBase]);

  const _renderHeader = useCallback(() => (renderHeader ? renderHeader(dataBase) : null), [dataBase, renderHeader]);

  const _renderFooter = useCallback(() => (renderFooter ? renderFooter(dataBase) : null), [dataBase, renderHeader]);

  const imageStyle = useMemo(
    () => [{ width, height, minHeight: 0, minWidth: 0 }, containerImageStyle] as StyleProp<ImageStyle>,
    [width, height]
  );
  const imageProps = useMemo<ImageProps>(
    () => ({
      key: uri,
      data,
      resizeMethod: 'auto',
      source: { uri },
      style: imageStyle
    }),
    [imageStyle, uri, data]
  );

  return (
    <View>
      <TouchableOpacity onPress={_onPress} activeOpacity={typeof onPress === 'function' ? 0.6 : 1}>
        <View>
          {_renderHeader()}
          <Injector defaultComponent={FastImage} defaultProps={imageProps} />
          {_renderFooter()}
        </View>
      </TouchableOpacity>
    </View>
  );
};

export const Cell = memo(CellComponent, isEqual);
