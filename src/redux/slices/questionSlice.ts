import { createSlice } from '@reduxjs/toolkit';

const questionSlice = createSlice({
  name: 'user',
  initialState: {
    questions: []
  },
  reducers: {
    setQuestions: (state, {payload})=>{
      state.questions = payload
    }
  }
});

export const { setQuestions } = questionSlice.actions;
export default questionSlice.reducer;
