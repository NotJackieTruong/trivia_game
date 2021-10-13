import modeSlice from './modeSlice';
import orderSlice from './orderSlice';
import originSlice from './originSlice';
import productSlice from './productSlice';
import switchNavigatorSlice from './switchNavigatorSlice';
import userSlice from './userSlice';

import { combineReducers } from '@reduxjs/toolkit';

const combinedReducer = combineReducers({
  switchNavigatorSlice,
  userSlice,
  productSlice,
  orderSlice,
  originSlice,
  modeSlice
});

const rootReducer = (state: any, action: any) => {
  if (action.type === 'user/logout') {
    state = undefined;
  }
  return combinedReducer(state, action);
};
export type RootState = ReturnType<typeof rootReducer>;
export default rootReducer;
