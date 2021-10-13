import StackApp from '../stack/StackApp';
import {
  STACK_BOTTOM_ADMIN,
  STACK_BOTTOM_PROVIDER,
  STACK_BOTTOM_SELLER,
  STACK_BOTTOM_UN_AUTH
} from '../stack/StackBottomBar';
import { BottomTabBar, createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import { Platform, Text } from 'react-native';
import R from '#assets';
import { useSelector } from '#common';
import FstImage from '#components/FstImage/FstImage';
import { SCREEN_ROUTER, SCREEN_ROUTER_APP } from '#config/screenType';
import { colors, fonts } from '#theme';

import { isIPhoneX } from '#utils/IPhoneXHelper';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();
const TabBarIcon = {
  [SCREEN_ROUTER_APP.HOME]: R.images.ic_home,
  [SCREEN_ROUTER_APP.USER]: R.images.ic_user
};

const TabBarName = {
  [SCREEN_ROUTER_APP.HOME]: R.strings().title_bar_home,
  [SCREEN_ROUTER_APP.USER]: R.strings().title_bar_user
};

const renderTabBarIcon = (focused: boolean, route: any) => {
  const sizeIcon = focused ? 30 : 25;
  const tintColor = focused ? colors.primary : colors.focus;
  return (
    <FstImage
      source={TabBarIcon[route.name]}
      style={{
        width: sizeIcon,
        height: sizeIcon
      }}
      resizeMode="contain"
      tintColor={tintColor}
    />
  );
};

const renderTabBarLabel = (focused: boolean, route: any) => {
  const tintColor = focused ? colors.primary : colors.focus;
  return <Text children={TabBarName[route.name]} style={[fonts.regular12, { color: tintColor }]} />;
};

const MainTab = () => {
  const { role } = useSelector(state => state.modeSlice);
  const getTabScreen = () => {
    switch (role) {
      default:
        return STACK_BOTTOM_UN_AUTH;
    }
  };
  return (
    <Tab.Navigator
      tabBar={props => (
        <BottomTabBar
          {...props}
          style={[
            props.style,
            {
              // eslint-disable-next-line no-nested-ternary
              height: Platform.OS !== 'ios' ? 60 : isIPhoneX() ? 90 : 80
            }
          ]}
        />
      )}
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused }) => renderTabBarIcon(focused, route),
        tabBarLabel: ({ focused }) => renderTabBarLabel(focused, route)
      })}>
      {Object.keys(getTabScreen()).map((elem, index) => (
        <Tab.Screen key={index} name={elem} component={getTabScreen()[elem]} />
      ))}
    </Tab.Navigator>
  );
};

export const Authentication = () => (
  <Stack.Navigator headerMode="none" screenOptions={{ headerShown: false, gestureEnabled: true }}>
    <Stack.Screen name={SCREEN_ROUTER.MAIN} component={MainTab} />
    {Object.keys(StackApp).map((elem, index) => (
      <Stack.Screen key={index} name={elem} component={StackApp[elem]} />
    ))}
  </Stack.Navigator>
);
