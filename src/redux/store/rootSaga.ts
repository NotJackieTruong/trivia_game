import { appSaga } from '../saga/index';

import { all } from 'redux-saga/effects';

export const rootSaga = function* rootSaga() {
  yield all([appSaga()]);
};
