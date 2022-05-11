import { createSlice } from '@reduxjs/toolkit';
import { setInitialStateAsync } from './channelsSlice.js';

const initialState = {
  messages: [],
};

const messagesSlice = createSlice({
  name: 'messagesInfo',
  initialState,
  reducers: {
    addMessage: (state, { payload }) => {
      state.messages = [...state.messages, payload];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(setInitialStateAsync.fulfilled, (state, action) => {
        const { messages } = action.payload;
        state.messages = messages;
      });
  },
});

export const selectorMessagesInfo = (state) => state.messagesInfo;

export const { actions } = messagesSlice;

export default messagesSlice.reducer;
