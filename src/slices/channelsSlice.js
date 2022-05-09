import { createSlice, createAction, createAsyncThunk, createEntityAdapter } from '@reduxjs/toolkit';
import axios from 'axios';
import routes from '../routes.js';

const getAuthHeader = () => {
  const userId = JSON.parse(localStorage.getItem('userId'));

  return { Authorization: `Bearer ${userId.token}` };
};

export const setInitialStateAsync = createAsyncThunk(
  'channelsInfo/setInitialState',
  async (payload) => {
  const { data } = await axios.get(routes.channelsPath(), { headers: getAuthHeader() });
  console.log(data)
  return data;
  }
);

const initialState = {
  channels: [],
  currentChannelId: null,
};

export const channelsSlice = createSlice({
  name: 'channelsInfo',
  initialState,
  reducers: {
    setCurrentChannel: (state, { payload }) => {
      const { id } = payload
      state.currentChannelId = id;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(setInitialStateAsync.fulfilled, (state, action) => {
        const { channels, currentChannelId } = action.payload;
        state.channels = channels;
        state.currentChannelId = currentChannelId;
      });
  },
});

export const selectorChannelsInfo = (state) => state.channelsInfo;

export const { actions } = channelsSlice;

export default channelsSlice.reducer;
