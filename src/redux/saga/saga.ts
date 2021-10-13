import { all, call, put } from 'redux-saga/effects';

import { APP_MODE_URL, AppModeType } from '#api';
import { checkKeyInObject } from '#common';
import { STRING_VALUE } from '#config';
import { onLoadAppEnd, onSetAppMode, onSetAppTheme } from '#redux/modeSlice';
import { loadString } from '#storage';
import { MyAppTheme, ThemeType } from '#theme';

export function* onLoadAppModeAndTheme() {
  const { appMode, appTheme } = yield all({
    appMode: call(loadString, STRING_VALUE.APP_MODE),
    appTheme: call(loadString, STRING_VALUE.APP_MODE)
  });

  if (typeof appMode === 'string' && checkKeyInObject(APP_MODE_URL, appMode)) {
    yield put(onSetAppMode(appMode as AppModeType));
  }
  if (typeof appTheme === 'string' && checkKeyInObject(MyAppTheme, appTheme)) {
    yield put(onSetAppTheme(appTheme as ThemeType));
  }
  yield put(onLoadAppEnd());
}
