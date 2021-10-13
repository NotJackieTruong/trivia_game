import StackAuth from '../stack/StackAuth';

import { createStackNavigator } from '@react-navigation/stack';

import React from 'react';

const Stack = createStackNavigator();

export const UnAuthentication = () => (
  <Stack.Navigator
    headerMode="none"
    mode="modal"
    children={Object.keys(StackAuth).map((elem, index) => (
      <Stack.Screen key={index} name={elem} component={StackAuth[elem]} />
    ))}
  />
);
