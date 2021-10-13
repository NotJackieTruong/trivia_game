import * as Saga from './saga';

import { takeLatest } from 'redux-saga/effects';

import { onLoadApp } from '#redux/modeSlice';

export function* appSaga() {
  yield takeLatest(onLoadApp.type, Saga.onLoadAppModeAndTheme);
}
