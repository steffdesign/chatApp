import React from 'react';

import Message from './Message/Message';

const Messages = ({ messages, name, room }) => (
  <div className="chat-body">
    <div className="messages">
      {messages.filter(m => m.room === room.toLowerCase()).map((message, i) => <div key={i} className="message"><Message message={message} name={name}/></div>)}
    </div>
  </div>
);

export default Messages;