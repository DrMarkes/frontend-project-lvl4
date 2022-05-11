import React, { useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import { selectorMessagesInfo } from '../slices/messagesSlice.js';

const scrollToBottom = (bottomRef) => {
  bottomRef.current.addEventListener('DOMNodeInserted', (event) => {
    const { currentTarget: target } = event;
    target.scroll({ top: target.scrollHeight, behavior: 'smooth' });
  });
};

export default function MessagesContainer() {
  const { messages } = useSelector(selectorMessagesInfo);
  const bottomRef = useRef();

  useEffect(() => {
    // scrollToBottom(bottomRef);
  }, [messages])

  const renderMessages = messages.map((message) => {

    return (
      <div className="text-break mb-2" key={message.id}>
        <b>{message.username}</b>
        {': '}
        {message.body}
      </div>
    );
  })

  return (
    <div id="messages-box" ref={bottomRef} className="chat-messages overflow-auto px-5">
      {renderMessages}
    </div>
  )
}
