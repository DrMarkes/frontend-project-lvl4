import { configureStore } from '@reduxjs/toolkit';

import channelsReducer from './channelsSlice.js';
import messagesReducer from './messagesSlice.js';

const store = configureStore({
  reducer: {
    channelsInfo: channelsReducer,
    messagesInfo: messagesReducer,
  },
});

export default store;
