import { rootSaga } from './rootSaga';

import Reactotron from '../../reactotron/ReactotronConfig';
import slices from '../slices';

import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';
import thunk from 'redux-thunk';

const sagaMiddleware = createSagaMiddleware();
const middleware = [...getDefaultMiddleware({ serializableCheck: false }), sagaMiddleware].concat(thunk);
const devMode = __DEV__;

const storeConfig = () => {
  const store = configureStore({
    reducer: slices,
    devTools: devMode,
    middleware,
    enhancers: [Reactotron.createEnhancer()]
  });
  sagaMiddleware.run(rootSaga);
  return store;
};

// const store = configureStore({
//   reducer: slices,
//   devTools: true,
//   middleware: getDefaultMiddleware => getDefaultMiddleware().concat(thunk),
//   enhancers: [Reactotron.createEnhancer()],
// });
// sagaMiddleware.run(rootSaga);

const store = storeConfig();

export default store;
