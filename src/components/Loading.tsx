import { UIActivityIndicator } from 'react-native-indicators';

import React, { Component } from 'react';
import { View } from 'react-native';

import { colors } from '#theme';

export default class Loading extends Component {
  render() {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <UIActivityIndicator color={colors.primary} />
      </View>
    );
  }
}
