import { configureStore } from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';

import rootSaga from '../sagas/rootSaga.js';
import channelsReducer from './channelsSlice.js';
import messagesReducer from './messagesSlice.js';

const sagaMiddleware = createSagaMiddleware();

const store = configureStore({
  reducer: {
    channelsInfo: channelsReducer,
    messagesInfo: messagesReducer,
  },
  // middleware: sagaMiddleware,
});

// sagaMiddleware.run(rootSaga);

export default store;
