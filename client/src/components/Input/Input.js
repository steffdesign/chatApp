import React from 'react';

const Input = ({ setMessage, sendMessage, message }) => (
  <form className="form">
    <input
      className="input form-control chat_form"
      type="text"
      placeholder="Type a message..."
      value={message}
      onChange={({ target: { value } }) => setMessage(value)}
      onKeyPress={event => event.key === 'Enter' ? sendMessage(event) : null}
    />

    <button className="sendButton btn send-btn" type="submit" onClick={e => sendMessage(e)}>
      <i className="fab fa-telegram-plane"></i>
    </button>
  </form>
)

export default Input;