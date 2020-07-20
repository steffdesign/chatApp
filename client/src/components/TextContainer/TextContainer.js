import React from 'react';
import { Link } from "react-router-dom";

const TextContainer = ({ users, actualUser, allRooms, publicRooms, actualTab, actualRoom}) => (
  <div className="textContainer">
    {
      users
        ? (
          <div className="sidebar-body" id="chatsidebar">
            <h5>{ actualTab === 'chats' ? 'Current chats': actualTab === 'groups' ? 'Available Groups' : actualTab === 'users' ? 'Connected Users' : 'General Chat' }</h5>
              <ul className="user-list">
              {
                  actualTab === 'chats' ? allRooms ? (
                    allRooms.map((room, i) => (
                  <li key={i} className={room.room === actualRoom.toLowerCase() ? 'user-list-item unread' : 'user-list-item'}>
                    <div>
                        <div className="avatar">
                          <Link onClick={e => (!room.room) ? e.preventDefault() : null} to={`/chat?name=${room.name}&room=${room.room}&privateRoom=false`}>
                            <img src="assets/img/carousel1.jpg" className="rounded-circle" alt="image" />
                          </Link>
                        </div>
                    </div>
                    <div className="users-list-body">
                        <div>
                          <Link onClick={e => (!room.room) ? e.preventDefault() : null} to={`/chat?name=${room.name}&room=${room.room}&privateRoom=false`}>
                            <h5>{room.room.toUpperCase()}</h5>
                          </Link>
                        </div>
                    </div>
                </li>
                ))) : null : null}
              {
                actualTab === 'groups' ? publicRooms ? (
                  publicRooms.map((room, i) => (
                  <li key={i} className={room.room === actualRoom.toLowerCase() ? 'user-list-item unread' : 'user-list-item'}>
                      <div>
                          <div className="avatar">
                            <Link onClick={e => (!room.name || !room.room) ? e.preventDefault() : null} to={`/chat?name=${actualUser}&room=${room.room}&privateRoom=false`}>
                              <img src="assets/img/carousel1.jpg" className="rounded-circle" alt="image" />
                            </Link>
                          </div>
                      </div>
                      <div className="users-list-body">
                          <div>
                              <Link onClick={e => (!room.name || !room.room) ? e.preventDefault() : null} to={`/chat?name=${actualUser}&room=${room.room}&privateRoom=false`}>
                                <h5>{room.room.toUpperCase()}</h5>
                              </Link>
                              <p>{room.name === actualUser.toLowerCase() ? <b>My Group</b> : <b>Administrador: {room.name}</b>}</p>
                          </div>
                      </div>
                </li>
                ))): null : null}
                {
                actualTab === 'users' ? users.map(({name, id}) => (
                  name !== actualUser.toLowerCase() ?
                  <li key={name} className="user-list-item">
                    <div className="avatar avatar-online">
                        <img src="assets/img/avatar-8.jpg" className="rounded-circle" alt="image" />
                    </div>
                    <div className="users-list-body">
                        <div>
                          <Link onClick={e => (!name || !actualUser) ? e.preventDefault() : null} data-toggle="dropdown" to={`/chat?name=${name}&room=${name}_with_${actualUser}&privateRoom=true`}>
                            <h5>{name}</h5>
                          </Link>
                        </div>
                        <div className="last-chat-time">
                            <div className="chat-toggle mt-1">
                                <div className="dropdown">
                                    <Link onClick={e => (!name || !actualUser) ? e.preventDefault() : null} data-toggle="dropdown" to={`/chat?name=${name}&room=${name}_with_${actualUser}&privateRoom=true`}>
                                        <i className="fas fa-ellipsis-h ellipse_header"></i>
                                    </Link>
                                    <div className="dropdown-menu dropdown-menu-right">
                                        <a href="#" className="dropdown-item">Open</a>
                                        <a href="#" className="dropdown-item">Delete</a>
                                    </div>
                                </div>
                            </div>
                        </div>    
                    </div>
                </li>
                : null
                )): null}
            </ul>
          </div>
        )
        : null
    }
  </div>
);

export default TextContainer;