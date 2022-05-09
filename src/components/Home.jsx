import React, { useEffect } from 'react';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import cn from 'classnames';

import ButtonAdd from '../../assets/images/button-add.svg';
import { actions as channelsActions, selectorChannelsInfo, setInitialStateAsync } from '../slices/channelsSlice.js';

const getAuthHeader = () => {
  const userId = JSON.parse(localStorage.getItem('userId'));

  return { Authorization: `Bearer ${userId.token}` };
};

function Home() {
  const { channels, currentChannelId } = useSelector(selectorChannelsInfo);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setInitialStateAsync());
  }, []);

  const channelsEl = channels.map(({ name, id }) => {
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
            {channelsEl}
          </ul>
        </div>
        <div className="col p-0 h-100">
          <div className="d-flex flex-column h-100">
            <div className="bg-light mb-4 p-3 shadow-sm small" />
            <div className="mt-auto px-5 py-3" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
