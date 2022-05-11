import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { actions as channelsActions, selectorChannelsInfo } from '../slices/channelsSlice.js';
import cn from 'classnames';
import ButtonAdd from '../../assets/images/button-add.svg';

export default function ChannelsContainer() {
  const { channels, currentChannelId } = useSelector(selectorChannelsInfo);
  const dispatch = useDispatch();

  const handleClick = (id) => () => {
    dispatch(channelsActions.setCurrentChannel({ id }));
  };

  const channelsEl = channels.map(({ name, id }) => {
    const classnames = cn(['w-100', 'rounded-0', 'text-start', 'btn'], {
      'btn-secondary': id === currentChannelId,
    });

    return (
      <li key={id} className="nav-item w-100">
        <button type="button" className={classnames} onClick={handleClick(id)}>
          <span className="me-1">#</span>
          {name}
        </button>
      </li>
    );
  });

  return (
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
  );
}
