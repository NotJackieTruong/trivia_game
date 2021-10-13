import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { ProductApi } from '#api';

export const getListProductAction = createAsyncThunk('product/get', async () => {
  const res = await ProductApi.requestListProduct();
  return res.data;
});

type ProductState = { isLoading: boolean; data: Array<any>; error: any };

const initialState: ProductState = { isLoading: true, data: [], error: null };

const productSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(getListProductAction.pending, (state, action) => {
      state.isLoading = true;
      state.error = null;
      return state;
    });
    builder.addCase(getListProductAction.fulfilled, (state, action) => {
      state.data = action.payload;
      state.isLoading = false;
      state.error = null;
      return state;
    });
    builder.addCase(getListProductAction.rejected, (state, action) => {
      state.error = true;
      state.isLoading = false;
      return state;
    });
  }
});

export default productSlice.reducer;
