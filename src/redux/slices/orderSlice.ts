import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { OrderApi } from '#api';

type OrderState = {
  isLoading: boolean;
  data: Array<any>;
  error: any;
  search: string | any;
  isLoadMore: boolean | any;
  next: string | null;
};

type ListOrderParams = {
  search?: string;
  next?: string;
};

const initialState: OrderState = { isLoading: true, data: [], error: null, search: '', isLoadMore: false, next: null };

export const getListOrderAction = createAsyncThunk('order/getListOrder', async (params?: ListOrderParams) => {
  const res = await OrderApi.listOrder(params);
  return {
    data: res,
    params: params?.search
  };
});

const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(getListOrderAction.pending, (state, action) => {
      state.isLoading = !state.data.length || !state.next;
      state.error = null;
      state.search = action.meta.arg?.search;
      state.isLoadMore = !!action.meta.arg?.next || action.meta.arg?.search;
      state.next = null;
      return state;
    });
    builder.addCase(getListOrderAction.fulfilled, (state, action) => {
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
    builder.addCase(getListOrderAction.rejected, (state, action) => {
      state.error = true;
      state.data = [];
      state.isLoading = false;
      state.isLoadMore = false;
      return state;
    });
  }
});
export default orderSlice.reducer;
