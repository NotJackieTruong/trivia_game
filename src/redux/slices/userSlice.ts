import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';

const userSlice = createSlice({
  name: 'user',
  initialState: {
    isError: null,
    isLoading: false,
    data: null
  },
  reducers: {
    logout: state => {}
  }
});

export const { logout } = userSlice.actions;
export default userSlice.reducer;
