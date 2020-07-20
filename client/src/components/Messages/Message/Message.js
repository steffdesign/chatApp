import React from 'react';

const Message = ({ message: { text, user }, name }) => {
  let isSentByCurrentUser = false;

  const trimmedName = name.trim().toLowerCase();

  if(user === trimmedName) {
    isSentByCurrentUser = true;
  }

  return (
    isSentByCurrentUser
      ? (
         <div className="chats chats-right">

            <div className="chat-content">
                <div className="message-content">
                    {text}
                </div>
            </div>
          </div>
        )
        : user.trim().toLowerCase() !== 'admin' ? 
        
        (
          <div className="chats">
            <div className="chat-content">
              <div className="message-content">
                <b>{user}</b> : {text}
              </div>
            </div>
          </div>
        )
        :
        (
          <div className="chat-line">
							<span className="chat-date">{text}</span>
						</div>
        )
  );
}

export default Message;