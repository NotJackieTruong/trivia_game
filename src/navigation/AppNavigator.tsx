import { Authentication } from './Authen';
import NavigationUtil from './NavigationUtil';
import { UnAuthentication } from './UnAuthen';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import isEqual from 'react-fast-compare';
import BootSplash from 'react-native-bootsplash';
import KeyboardManager from 'react-native-keyboard-manager';

import React, { memo, useEffect } from 'react';
import { Platform } from 'react-native';

import { RXStore, dispatch, useSelector } from '#common';
import { AnimProcess, ProgressDialog, SnackBar } from '#components';
import { AppMode } from '#components/AppMode/AppMode';
import { ImageTransition } from '#components/LightBox/ImageTransition';
import { SCREEN_ROUTER } from '#config/screenType';
import { onLoadApp } from '#redux/modeSlice';
import SplashScreen from '#screens/app/SplashScreen';
import { MyAppTheme } from '#theme';
import {
  animProgressHolder,
  dialogHolder,
  hideLoading,
  imageTransitionHolder,
  showLoading,
  snackBarHolder
} from '#utils';

const AppStack = createStackNavigator();

const RootNavigation = () => (
  <AppStack.Navigator headerMode="none" screenOptions={{}}>
    <AppStack.Screen name={SCREEN_ROUTER.MAIN} component={Authentication} />
    <AppStack.Screen name={SCREEN_ROUTER.AUTH} component={UnAuthentication} />
  </AppStack.Navigator>
);

const AppNavigatorComponent = () => {
  const { appMode, loading, showDialog, theme } = useSelector(x => x.modeSlice);
  useEffect(() => {
    BootSplash.hide({ fade: true }).then(val => {
      dispatch(onLoadApp());
    });
  }, []);

  useEffect(() => {
    if (showDialog) {
      showLoading();
    } else {
      hideLoading();
    }
  }, [showDialog]);

  useEffect(() => {
    if (Platform.OS === 'ios') {
      if (theme === 'dark') {
        KeyboardManager.setKeyboardAppearance('dark');
      } else {
        KeyboardManager.setKeyboardAppearance('light');
      }
    }
  }, [theme]);

  if (loading) {
    return <SplashScreen />;
  }

  return (
    <NavigationContainer
      ref={navigatorRef => {
        NavigationUtil.setTopLevelNavigator(navigatorRef);
      }}
      theme={MyAppTheme[theme]}
      children={
        <>
          {!loading && (
            <>
              <RootNavigation />
              <ProgressDialog ref={dialogHolder} />
              <AnimProcess ref={animProgressHolder} />
              <SnackBar ref={snackBarHolder} />
              <ImageTransition ref={imageTransitionHolder} />
              {appMode !== 'prod' && <AppMode {...{ appMode }} />}
            </>
          )}
          <RXStore />
        </>
      }
    />
  );
};

const AppNavigator = memo(AppNavigatorComponent, isEqual);
export default AppNavigator;
