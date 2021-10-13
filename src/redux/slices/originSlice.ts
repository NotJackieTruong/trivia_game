import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { OriginApi } from '#api';

type OriginState = {
  isLoading: boolean;
  data: Array<any>;
  error: any;
  search: string | any;
  isLoadMore: boolean | any;
  next: string | null;
};

type OriginParams = {
  search?: string;
  next?: string;
};

const initialState: OriginState = { isLoading: true, data: [], error: null, search: '', isLoadMore: false, next: null };

export const getListOriginAction = createAsyncThunk('origin/getListOrigin', async (params?: OriginParams) => {
  const res = await OriginApi.getListOrigin(params);
  return {
    data: res,
    params: params?.search
  };
});

const originSlice = createSlice({
  name: 'origin',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(getListOriginAction.pending, (state, action) => {
      state.isLoading = !state.data.length || !state.next;
      state.error = null;
      state.search = action.meta.arg?.search;
      state.isLoadMore = !!action.meta.arg?.next || action.meta.arg?.search;
      state.next = null;
      return state;
    });
    builder.addCase(getListOriginAction.fulfilled, (state, action) => {
      state.data =
        !action.payload.params || !action.payload.data.total
          ? action.payload.data.data
          : state.data.concat(action.payload.data.data);
      state.isLoading = false;
      state.next = action.payload.data.next;
      state.error = null;
      state.isLoadMore = false;
      return state;
    });
    builder.addCase(getListOriginAction.rejected, (state, action) => {
      state.error = true;
      state.data = [];
      state.isLoading = false;
      state.isLoadMore = false;
      return state;
    });
  }
});
export default originSlice.reducer;
