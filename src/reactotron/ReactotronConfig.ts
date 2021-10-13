import Reactotron, { devTools, overlay, trackGlobalErrors } from 'reactotron-react-native';

import { reactotronRedux } from 'reactotron-redux';
import sagaPlugin from 'reactotron-redux-saga';
import { NativeModules } from 'react-native';

let scriptHostname = 'localhost';
if (__DEV__) {
  const { scriptURL } = NativeModules.SourceCode;
  scriptHostname = scriptURL.split('://')[1].split(':')[0];
}

const reactotron = Reactotron.configure({ host: scriptHostname })
  // .configure("RN Base")
  .use(overlay())
  .use(devTools())
  .use(reactotronRedux())
  .use(sagaPlugin({}))
  .use(
    trackGlobalErrors({
      // leave off any frames sourced from React Native itself
      veto: frame => frame.fileName.indexOf('../node_modules/react-native/') >= 0
    })
  )
  .useReactNative({
    networking: {
      ignoreUrls: /symbolicate/
    },
    asyncStorage: true,
    editor: true,
    overlay: true,
    devTools: true
  })
  .connect();

console.tron = Reactotron;
export default reactotron;
