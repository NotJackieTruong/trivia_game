import { connect } from 'react-redux';
import React from 'react';
import { Text, TouchableOpacity } from 'react-native';

import ScreenWrapper from '#components/Screen/ScreenWrapper';
import { SCREEN_ROUTER } from '#config/screenType';
import NavigationUtil from '#navigation';

const HomeDetailScreen = props => {
  return (
    <ScreenWrapper
      titleHeader={'HomeDetailScreen'}
      children={
        <TouchableOpacity
          onPress={() => {
            NavigationUtil.navigate(SCREEN_ROUTER.AUTH);
          }}>
          <Text children="Login" />
        </TouchableOpacity>
      }
    />
  );
};

const mapStateToProps = state => ({});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(HomeDetailScreen);
