import isEqual from 'react-fast-compare';
import React, { memo } from 'react';
import { View, Text, StyleSheet } from 'react-native';

const styles = StyleSheet.create({});

interface LoginScreenProps {}

const LoginScreenComponent = ({}: LoginScreenProps) => {
  return (
    <View>
      <Text />
    </View>
  );
};

const LoginScreen = memo(LoginScreenComponent, isEqual);
export default LoginScreen;
