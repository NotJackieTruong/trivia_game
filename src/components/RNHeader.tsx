import NavigationUtil from '../navigation/NavigationUtil';

import isEqual from 'react-fast-compare';
import { Header } from 'react-native-elements';
import FastImage from 'react-native-fast-image';

import React, { Component, memo } from 'react';
import { StatusBarProps, StyleSheet, Text, TouchableOpacity, ViewStyle } from 'react-native';

import R from '#assets';
import { fonts } from '#theme';
import * as theme from '#theme';

interface Props {
  color?: string;
  back?: boolean;
  /**
   * View nút phải
   */
  rightComponent?: React.ReactNode;
  /**
   * View nút trái
   */
  leftComponent?: React.ReactNode;
  /**
   * Title thanh header
   */
  titleHeader: string;
}

interface BackProps {
  style?: ViewStyle;
}

const STT_BAR_STYLE: StatusBarProps = {
  barStyle: 'light-content',
  translucent: true,
  backgroundColor: 'transparent'
};

export class BackButton extends Component<BackProps> {
  render() {
    const { style } = this.props;
    return (
      <TouchableOpacity style={[style || styles.leftComp]} onPress={NavigationUtil.goBack}>
        <FastImage
          source={R.images.ic_back}
          style={{ width: 30, height: 30 }}
          tintColor={theme.colors.white}
          resizeMode="contain"
        />
      </TouchableOpacity>
    );
  }
}

const RNHeaderComponent = (props: any) => {
  const { color, back, titleHeader, rightComponent, leftComponent } = props;
  return (
    <Header
      placement="center"
      containerStyle={styles.container}
      leftComponent={back ? <BackButton /> : leftComponent}
      centerComponent={<Text style={[fonts.semi_bold18, { color: color || 'white' }]}>{titleHeader}</Text>}
      rightComponent={rightComponent}
      statusBarProps={STT_BAR_STYLE}
    />
  );
};

const RNHeader = memo(RNHeaderComponent, isEqual);
export default RNHeader;

const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.colors.primary,
    borderBottomColor: theme.colors.primary,
    height: 90
  },
  leftComp: {
    height: '100%',
    flexDirection: 'row',
    alignItems: 'center'
  },
  rightComp: {
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10
  }
});
