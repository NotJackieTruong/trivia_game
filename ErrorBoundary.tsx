import React, { Component } from 'react';
import { StyleSheet, Text, View, Alert, Clipboard, Linking } from 'react-native';
import { NativeModules } from 'react-native';
import CodePush from 'react-native-code-push';
import * as Sentry from '@sentry/react-native';

export default class ErrorBoundary extends Component {
  state = {
    hasError: false,
    error: null
  };

  static getDerivedStateFromError(error: any) {
    Sentry.captureException(error);
    return { hasError: true, error };
  }

  reloadApp = () => {
    CodePush.restartApp();
  };

  render() {
    if (this.state.hasError) {
      return (
        <View style={styles.container}>
          <View style={styles.subContainer}>
            <Text style={styles.bigBoldText}>Ứng dụng không thể tiếp tục...</Text>
            <Text style={styles.text}>Hãy báo cáo điều này lại với chúng tôi!</Text>
          </View>
        </View>
      );
    }

    return this.props.children;
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  subContainer: {
    marginHorizontal: 30,
    alignItems: 'center'
  },
  icon: {
    marginBottom: 18
  },
  bigBoldText: {
    fontSize: 18,
    color: 'black',
    letterSpacing: 0.8,
    fontWeight: 'bold'
  },
  text: {
    marginTop: 22,
    marginHorizontal: 50,
    lineHeight: 18,
    fontSize: 12,
    color: 'black',
    letterSpacing: 0.4,
    textAlign: 'center'
  },
  btnContainer: {
    marginTop: 44
  },
  restartBtn: {
    marginTop: 34
  }
});
