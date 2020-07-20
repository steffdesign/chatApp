import React, { useState, useEffect } from "react";
import queryString from 'query-string';
import io from "socket.io-client";
import { Link } from "react-router-dom";

import Messages from '../Messages/Messages';
import InfoBar from '../InfoBar/InfoBar';
import Input from '../Input/Input';

let socket;

const Chat = ({ location }) => {
  const [name, setName] = useState('');
  const [room, setRoom] = useState('');
  const [addRoom, setNewRoom] = useState('');
  const [users, setUsers] = useState('');
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const [rooms, setRooms] = useState('');
// Rooms by user ====>>> const [roomsUser, setRoomsByUser] = useState('');
  const [allRoomsByUser, setAllRoomsByUser] = useState('');
  const [actualTab, setTab] = useState('chats');
  const ENDPOINT = 'http://localhost:5000';

  useEffect(() => {
    const { name, room, privateRoom } = queryString.parse(location.search);

    socket = io(ENDPOINT);

    setRoom(room);
    setName(name);

    socket.emit('join', { name, room, privateRoom }, (error) => {
      if(error) {
        alert(error);
      }
    });

    socket.on('message', message => {
        setMessages(messages => [ ...messages, message ]);
    });
    
  }, [ENDPOINT, location.search]);
  
  useEffect(() => {
    
    if (messages){
        if (room){
            const roomsActuales = messages.findIndex((m) => m.room === room);
            if(roomsActuales === -1) {
                socket.on('message', message => {
                    setMessages(messages => [ ...messages, message ]);
                });
                console.log(messages);
            }
        }
    }
    
    socket.on("roomData", ({ users, rooms, allRoomsByUser }) => {
      setUsers(users);
      setRooms(rooms);
      setAllRoomsByUser(allRoomsByUser);
    });

}, []);

  const sendMessage = (event) => {
    event.preventDefault();

    if(message) {
      socket.emit('sendMessage', message, () => setMessage(''));
    }
  }

  const changeTab = (event) => {
    if (event){
        setTab(event.target.name);
    }
  }

  if (setNewRoom){
      console.log(rooms);
  }

  return (
    <div className="main-wrapper">
      <div className="content main_content">
        <div className="sidebar-group left-sidebar chat_sidebar">
            <InfoBar room={room} name={name} users={users} allRooms={allRoomsByUser} publicRooms={rooms} actualTab={actualTab} changeTab={changeTab}/>
        </div>       
        <div className="chat" id="middle">
                <div className="chat-header">
                    <div className="user-details">
                        <div className="d-lg-none ml-2">
                            <ul className="list-inline mt-2 mr-2">
                                <li className="list-inline-item">
                                    <a className="text-muted px-0 left_side" href="#" data-chat="open">
                                        <i className="fas fa-arrow-left"></i>
                                    </a>
                                </li>
                            </ul>
                        </div>
                        <figure className="avatar ml-1">
                            <img src="assets/img/avatar-2.jpg" className="rounded-circle" alt="image" />
                        </figure>
                        <div className="mt-1">
                            <h5 className="mb-1">{room}</h5>
                        </div>
                    </div>
                </div>
                <Messages messages={messages} name={name} room={room}/>
                <div className="chat-footer">
                    <Input message={message} setMessage={setMessage} sendMessage={sendMessage} />
                </div>
            </div>
        </div>
        <div className="modal active" id="new_group">
            <div className="modal-dialog modal-dialog-centered">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">
                            New Group: {addRoom} by {name}
                        </h5>
                        <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                            <i className="fas fa-times close_icon"></i>
                        </button>
                    </div>
                    <div className="modal-body">
                        <div id="create-group-details" className="tab-pane fade show active"
                                role="tabpanel">
                                <div className="form-group">
                                    <label>Name</label>
                                    <input className="form-control form-control-lg group_formcontrol" name="new-chat-title" type="text" placeholder="Group Name" onChange={(event) => setNewRoom(event.target.value)} />
                                </div>
                            </div>
                        <div className="pt-3">
                            <div className="container text-center">
                                <Link onClick={e => (!addRoom ? e.preventDefault() : null)} to={`/chat?name=${name}&room=${addRoom}&privateRoom=false`}>
                                    <button className="btn btn-block newgroup_create mb-1 mt-0" type="submit">Create group</button>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div className="modal fade" id="profile_modal">
            <div className="modal-dialog modal-dialog-centered">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">
                            Profile
                        </h5>
                        <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                            <i className="fas fa-times close_icon"></i>
                        </button>
                    </div>
                    <div className="modal-body">
                        <div className="card mb-6 profile_Card">
                            <div className="card-body">
                                <div className="text-center py-6">
                                    <div className="avatar avatar-xl mb-3">
                                        <img className="avatar-img rounded-circle mCS_img_loaded" src="assets/img/avatar-5.jpg" alt="" />
                                    </div>
                                    <h5>{name}</h5>
                                </div>
                            </div>
                        </div>
                        <div className="form-group">
                            <label>Name</label>
                            <input className="form-control form-control-lg group_formcontrol" name="new-chat-title" type="text" placeholder="Name" />
                        </div>
                        <div className="form-row profile_form mt-3 mb-1">
                            <button type="button" className="btn btn-block newgroup_create mb-0" data-dismiss="modal">
                                Update Profile
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
  );
}

export default Chat;
