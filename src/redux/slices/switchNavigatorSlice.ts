import { PayloadAction, createSlice } from '@reduxjs/toolkit';

import { SCREEN_ROUTER } from '#config/screenType';

interface SwitchPayload {
  switch: string;
  role: number;
}

const switchNavigatorSlice = createSlice({
  name: 'switch',
  initialState: {
    switch: SCREEN_ROUTER.SPLASH,
    role: -1
  },
  reducers: {
    navigateSwitch: (state, action: PayloadAction<SwitchPayload>) => {
      state.switch = action.payload.switch;
      state.role = action.payload.role;
    }
  }
});

export const { navigateSwitch } = switchNavigatorSlice.actions;
export default switchNavigatorSlice.reducer;
