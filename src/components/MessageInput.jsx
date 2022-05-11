import React, { useEffect } from 'react';

import ButtonSend from '../../assets/images/button-send.svg';
import { useFormik } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import { actions as messageActions } from '../slices/messagesSlice.js';
import { selectorChannelsInfo } from '../slices/channelsSlice.js';
import { io } from 'socket.io-client';

const socket = io();
socket.connect();

export default function MessageInput() {
  const dispatch = useDispatch();
  const { username } = JSON.parse(localStorage.getItem('userId'));
  const { currentChannelId: channelId } = useSelector(selectorChannelsInfo);
  const f = useFormik({
    initialValues: {
      body: '',
    },
    onSubmit: ({ body }) => {
      socket.emit('newMessage', { body, username, channelId });
    },
  });

  useEffect(() => {
    socket.on('newMessage', (data) => {
      dispatch(messageActions.addMessage(data));
    });
  }, []);

  return (
    <div className="mt-auto px-5 py-3">
      <form onSubmit={f.handleSubmit} className="py-1 border rounded-2">
        <div className="input-group has-validation">
          <input
            className="border-0 p-0 ps-2 form-control"
            type="text"
            name="body"
            aria-label="Новое сообщение"
            placeholder="Введите сообщение"
            value={f.values.body}
            onChange={f.handleChange}
          />
          <button type="submit" className="btn btn-group-vertical">
            <ButtonSend />
            <span className="visually-hidden">Отправить</span>
          </button>
        </div>
      </form>
    </div>
  );
}
