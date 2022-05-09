import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import cn from 'classnames';
import _ from 'lodash';

import ButtonAdd from '../../assets/images/button-add.svg';
import {
  actions as channelsActions,
  selectorChannelsInfo,
  setInitialStateAsync,
} from '../slices/channelsSlice.js';
import { selectorMessagesInfo } from '../slices/messagesSlice.js';

function Home() {
  const { channels, currentChannelId } = useSelector(selectorChannelsInfo);
  const { messages } = useSelector(selectorMessagesInfo);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setInitialStateAsync());
  }, []);

  const renderChannels = channels.map(({ name, id }) => {
    const handleClick = () => {
      dispatch(channelsActions.setCurrentChannel({ id }));
    };
    const classnames = cn(['w-100', 'rounded-0', 'text-start', 'btn'], {
      'btn-secondary': id === currentChannelId,
    });

    return (
      <li key={id} className="nav-item w-100">
        <button type="button" className={classnames} onClick={handleClick}>
          <span className="me-1">#</span>
          {name}
        </button>
      </li>
    );
  });

  const channelName = _.filter(channels, { id: currentChannelId })[0]?.name;

  return (
    <div className="container h-100 my-4 overflow-hidden rounded shadow">
      <div className="row h-100 bg-white flex-md-row">
        <div className="col-4 col-md-2 border-end pt-5 px-0 bg-light">
          <div className="d-flex justify-content-between mb-2 ps-4 pe-2">
            <span>Каналы</span>
            <button type="button" className="p-0 text-primary btn btn-group-vertical">
              <ButtonAdd />
              <span className="visually-hidden">+</span>
            </button>
          </div>
          <ul className="nav flex-column nav-pills nav-fill px-2">
            {renderChannels}
          </ul>
        </div>
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
            <div id="messages-box" className="chat-messages overflow-auto px-5" />
            <div className="mt-auto px-5 py-3" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
