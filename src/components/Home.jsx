import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import _ from 'lodash';

import ButtonAdd from '../../assets/images/button-add.svg';
import ChannelsContainer from './ChannelsContainer.jsx';
import {
  selectorChannelsInfo,
  setInitialStateAsync,
} from '../slices/channelsSlice.js';
import { selectorMessagesInfo } from '../slices/messagesSlice.js';
import MessageInput from './MessageInput';
import MessagesContainer from './MessagesContainer.jsx';

function Home() {
  const { channels, currentChannelId } = useSelector(selectorChannelsInfo);
  const { messages } = useSelector(selectorMessagesInfo);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setInitialStateAsync());
  }, []);

  const channelName = _.filter(channels, { id: currentChannelId })[0]?.name;

  return (
    <div className="container h-100 my-4 overflow-hidden rounded shadow">
      <div className="row h-100 bg-white flex-md-row">
        <ChannelsContainer />
        <div className="col p-0 h-100">
          <div className="d-flex flex-column h-100">
            <div className="bg-light mb-4 p-3 shadow-sm small">
              <p className="m-0">
                <b>
                  {'# '}
                  {channelName}
                </b>
              </p>
              <span className="text-muted">
                {messages.length}
                {' сообщений'}
              </span>
            </div>
            <MessagesContainer />
            <MessageInput />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
