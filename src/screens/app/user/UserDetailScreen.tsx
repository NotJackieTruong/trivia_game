import { connect } from 'react-redux';
import React from 'react';
import { Image, Text, TouchableOpacity } from 'react-native';

import R from '#assets';
import ScreenWrapper from '#components/Screen/ScreenWrapper';

const UserDetailScreen = props => {
  return (
    <ScreenWrapper
      titleHeader={'UserDetailScreen'}
      back={false}
      rightComponent={<Text children={'hihi'} />}
      children={
        <TouchableOpacity onPress={() => {}}>
          <Image source={R.images.ic_user} style={{ width: 100, height: 100 }} />
        </TouchableOpacity>
      }
    />
  );
};

const mapStateToProps = state => ({});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(UserDetailScreen);
