import { combineReducers } from '@reduxjs/toolkit';
import modeSlice from './modeSlice';
import orderSlice from './orderSlice';
import originSlice from './originSlice';
import productSlice from './productSlice';
import questionSlice from './questionSlice';
import switchNavigatorSlice from './switchNavigatorSlice';
import userSlice from './userSlice';


const combinedReducer = combineReducers({
  switchNavigatorSlice,
  userSlice,
  productSlice,
  orderSlice,
  originSlice,
  modeSlice,
  questionSlice,
});

const rootReducer = (state: any, action: any) => {
  if (action.type === 'user/logout') {
    state = undefined;
  }
  return combinedReducer(state, action);
};
export type RootState = ReturnType<typeof rootReducer>;
export default rootReducer;
