import { UIActivityIndicator } from 'react-native-indicators';

import React, { Component } from 'react';
import { Platform, StyleSheet, View } from 'react-native';

import { colors } from '#theme';

export default class LoadingProgress extends Component {
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.containerLoading}>
          <UIActivityIndicator color={colors.primary} />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    elevation: Platform.OS === 'android' ? 4 : 0
  },
  containerLoading: {
    height: 100,
    backgroundColor: 'white',
    padding: 25,
    borderRadius: 10
  }
});
