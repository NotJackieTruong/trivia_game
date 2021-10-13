import { connect } from 'react-redux';
import React from 'react';
import { Image, TouchableOpacity } from 'react-native';

import R from '#assets';
import ScreenWrapper from '#components/Screen/ScreenWrapper';
import { colors } from '#theme';

const UserScreen = props => {
  return (
    <ScreenWrapper
      titleHeader={'UserScreen'}
      back={false}
      children={
        <TouchableOpacity onPress={() => {}}>
          <Image source={R.images.ic_user} style={{ width: 100, height: 100, tintColor: colors.backgroundColor }} />
        </TouchableOpacity>
      }
    />
  );
};

const mapStateToProps = state => ({});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(UserScreen);
