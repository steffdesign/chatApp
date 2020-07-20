import React, { useState } from 'react';
import { Link } from "react-router-dom";

import './Join.css';

export default function SignIn() {
  const [name, setName] = useState('');
  const [room, setRoom] = useState('');

  return (
    <div className="joinOuterContainer">
      <div className="joinInnerContainer">
        <div className="account-content">
          <div className="login-header">
            <h3>Chats</h3>
          </div>
          <div className="form-group">
                <label>Name</label>
                <input className="form-control form-control-lg group_formcontrol" type="text" placeholder="Name" onChange={(event) => setName(event.target.value)}/>
            </div>
            <div className="form-group">
                <label>Room</label>
                <input className="form-control form-control-lg group_formcontrol" type="text" placeholder="Room" onChange={(event) => setRoom(event.target.value)}/>
            </div>
            <div className="pt-1">
              <div className="text-center">
                <Link onClick={e => (!name || !room) ? e.preventDefault() : null} to={`/chat?name=${name}&room=${room}&privateRoom=false`}>
                  <button className="btn newgroup_create btn-block d-block w-100" type="submit">Login</button>
                </Link>
              </div>
          </div>
        </div>
      </div>
    </div>
  );
}
