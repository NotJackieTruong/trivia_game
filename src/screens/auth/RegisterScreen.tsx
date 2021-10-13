import isEqual from 'react-fast-compare';
import React, { memo } from 'react';
import { View, Text, StyleSheet } from 'react-native';

const styles = StyleSheet.create({});

interface RegisterScreenProps {}

const RegisterScreenComponent = ({}: RegisterScreenProps) => {
  return (
    <View>
      <Text />
    </View>
  );
};

const RegisterScreen = memo(RegisterScreenComponent, isEqual);
export default RegisterScreen;
