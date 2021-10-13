/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import * as Sentry from '@sentry/react-native';

import React, { Suspense } from 'react';
import { StyleSheet, View } from 'react-native';
import { _transitionApp, transition } from './src/transition/TransitionService';

import AppNavigator from './src/navigation/AppNavigator';
import ErrorBoundary from './ErrorBoundary';
import KeyboardManager from 'react-native-keyboard-manager';
import OneSignalHelper from '#utils/OneSignalHelper';
import { Provider } from 'react-redux';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Transitioning } from 'react-native-reanimated';
import codePush from 'react-native-code-push';
import { isIos } from '#common';
import store from './src/redux/store';

const styles = StyleSheet.create({
   root: {
     flex: 1
   }
 });

 if (isIos) {
   KeyboardManager.setEnable(true);
   KeyboardManager.setEnableDebugging(false);
   KeyboardManager.setKeyboardDistanceFromTextField(10);
   KeyboardManager.setEnableAutoToolbar(false);
   // KeyboardManager.setToolbarDoneBarButtonItemText("Done");
   // KeyboardManager.setToolbarManageBehaviourBy("subviews"); // "subviews" | "tag" | "position"
   // KeyboardManager.setToolbarPreviousNextButtonEnable(false);
   // KeyboardManager.setToolbarTintColor('#0000FF'); // Only #000000 format is supported
   // KeyboardManager.setToolbarBarTintColor('#FFFFFF'); // Only #000000 format is supported
   // KeyboardManager.setShouldShowToolbarPlaceholder(true);
   KeyboardManager.setOverrideKeyboardAppearance(true);
   KeyboardManager.setKeyboardAppearance('default'); // "default" | "light" | "dark"
   KeyboardManager.setShouldResignOnTouchOutside(true);
   KeyboardManager.setShouldPlayInputClicks(true);
   KeyboardManager.resignFirstResponder();
   // KeyboardManager.isKeyboardShowing()
   //   .then((isShowing) => {
   //       // ...
   //   });
 }

 const initialSentry = () => {
   Sentry.init({
     dsn: 'https://5f9a0de6b01b45beb75bfb6ed1a9f5dc@o543980.ingest.sentry.io/5665135',
     // release: 'vn.com.vitrans@1.5+codepush:v182',
     debug: __DEV__,
     enableAutoSessionTracking: true,
     // Sessions close after app is 10 seconds in the background.
     sessionTrackingIntervalMillis: 10000,
     // environment: 'prod',
     ignoreErrors: [
       // Random plugins/extensions
       'top.GLOBALS',
       // See: http://blog.errorception.com/2012/03/tale-of-unfindable-js-error.html
       'originalCreateNotification',
       'canvas.contentDocument',
       'MyApp_RemoveAllHighlights',
       'http://tt.epicplay.com',
       "Can't find variable: ZiteReader",
       'jigsaw is not defined',
       'ComboSearch is not defined',
       'http://loading.retry.widdit.com/',
       'atomicFindClose',
       // Facebook borked
       'fb_xd_fragment',
       // ISP "optimizing" proxy - `Cache-Control: no-transform` seems to
       // reduce this. (thanks @acdha)
       // See http://stackoverflow.com/questions/4113268
       'bmi_SafeAddOnload',
       'EBCallBackMessageReceived',
       // See http://toolbar.conduit.com/Developer/HtmlAndGadget/Methods/JSInjection.aspx
       'conduitPage'
     ],
     denyUrls: [
       // Facebook flakiness
       /graph\.facebook\.com/i,
       // Facebook blocked
       /connect\.facebook\.net\/en_US\/all\.js/i,
       // Woopra flakiness
       /eatdifferent\.com\.woopra-ns\.com/i,
       /static\.woopra\.com\/js\/woopra\.js/i,
       // Chrome extensions
       /extensions\//i,
       /^chrome:\/\//i,
       // Other plugins
       /127\.0\.0\.1:4001\/isrunning/i, // Cacaoweb
       /webappstoolbarba\.texthelp\.com\//i,
       /metrics\.itunes\.apple\.com\.edgesuite\.net\//i
     ]
   });
 };

 const App = () => {
   React.useEffect(() => {
     if (!__DEV__) initialSentry();
     OneSignalHelper.initialization('312321312372198372198');
     return function cleanUp() {
       OneSignalHelper.destruction();
     };
   }, []);
   return (
     <SafeAreaProvider>
       <ErrorBoundary>
         <Provider store={store}>
           <Suspense fallback={<View />}>
             <Transitioning.View style={styles.root} transition={transition} ref={_transitionApp}>
               <AppNavigator />
             </Transitioning.View>
           </Suspense>
         </Provider>
       </ErrorBoundary>
     </SafeAreaProvider>
   );
 };

 const codePushOptions = { checkFrequency: codePush.CheckFrequency.MANUAL };

 const MyApp = codePush(codePushOptions)(App);

 export default MyApp;
