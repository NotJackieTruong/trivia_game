import { ImageProps } from './FstImage.props';

import { Block } from '../Block/Block';

import FastImage, { ImageStyle } from 'react-native-fast-image';

import React, { useMemo, useState } from 'react';
import { ActivityIndicator, Image, StyleProp, StyleSheet, TouchableOpacity, View } from 'react-native';

import R from '#assets';
import { enhance } from '#common';
import { colors } from '#theme';

const styles = StyleSheet.create({
  containerLoading: {
    backgroundColor: colors.backgroundColor,
    flex: 1,
    overflow: 'hidden'
  },
  containerReload: {
    flex: 1,
    justifyContent: 'center'
  }
});

const FstImage = (props: ImageProps) => {
  const [imageLoading, setImageLoading] = useState(false);
  const [error, setError] = useState(false);
  const [, useReloadKey] = useState(new Date().getTime().toString());
  const reloadImage = () => {
    useReloadKey(new Date().getTime().toString());
  };
  const { style: styleOverride = {}, resizeMode = 'cover', containerStyle } = props;
  let { source } = props;
  const style: StyleProp<ImageStyle> = useMemo(() => enhance([styleOverride]), [styleOverride]);

  if (typeof source === 'object') {
    source = source.uri
      ? {
          ...source,
          priority: FastImage.priority.high,
          uri: source.uri
        }
      : R.images.ic_post;
  }
  return (
    <Block style={containerStyle}>
      <FastImage
        {...props}
        style={style}
        resizeMode={resizeMode}
        children={
          imageLoading ? (
            <View
              style={styles.containerLoading}
              children={
                <ActivityIndicator
                  color={colors.primary}
                  style={{
                    flex: 1
                  }}
                />
              }
            />
          ) : error ? (
            <TouchableOpacity
              style={styles.containerReload}
              children={
                <Image
                  style={{
                    alignSelf: 'center'
                  }}
                  source={R.images.ic_reload}
                  resizeMode="center"
                />
              }
              onPress={reloadImage}
            />
          ) : (
            props.children && props.children
          )
        }
        onLoadStart={() => {
          setError(false);
          setImageLoading(true);
        }}
        onLoadEnd={() => {
          setImageLoading(false);
          setError(false);
        }}
        onError={() => {
          setError(true);
          setImageLoading(false);
        }}
        source={source}
      />
    </Block>
  );
};

export default FstImage;
