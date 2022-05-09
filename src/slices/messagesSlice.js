import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  messages: [],
};

const messagesSlice = createSlice({
  name: 'messagesInfo',
  initialState,
  reducers: {

  }
});

export const { actions } = messagesSlice;

export default messagesSlice.reducer;
