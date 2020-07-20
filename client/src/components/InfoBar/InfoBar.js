import React from 'react';

import TextContainer from '../TextContainer/TextContainer';

import './InfoBar.css';

const InfoBar = ({ room, name, users, allRooms, publicRooms, actualTab, changeTab}) => (
    
  <div id="chats" className="left-sidebar-wrap sidebar active">
  
      <div className="header">
          <div className="header-top">
              <div className="text-center mb-3">
                <figure className="avatar avatar-xl mb-3">
                    <img src="assets/img/women_avatar1.jpg" className="rounded-circle mCS_img_loaded" alt="image"/>
                </figure>
            </div>
              <ul className="header-action mt-4">
                  <li>
                      <a href="#" data-toggle="dropdown">
                          <i className="fas fa-ellipsis-h ellipse_header"></i>
                      </a>
                      <div className="dropdown-menu dropdown-menu-right header_drop_icon">
                          <a className="dropdown-item" data-toggle="modal" data-target="#new_group">
                            New Group
                          </a>
                          <a className="dropdown-item" data-toggle="modal" data-target="#profile_modal">Profile</a>
                          <a href="./" className="dropdown-item">Logout</a>
                      </div>
                  </li>
              </ul>
          </div>
          <ul className="nav nav-tabs chat-tabs mt-4">
              <li className="nav-item">
                  <button className="nav-link" name="chats" onClick={(e) => changeTab(e)}>Chat</button>
              </li>
              <li className="nav-item ml-1">
                  <button className="nav-link" name="groups" onClick={(e) => changeTab(e)}>Groups</button>
              </li>
              <li className="nav-item ml-1">
                  <button className="nav-link" name="users" onClick={(e) => changeTab(e)}>Users</button>
              </li>
          </ul>
          <button type="button" className="float-right btn btn-circle btn-sm header_button"
              data-toggle="modal" data-target="#new_group">
              <i className="fas fa-plus button_plus"></i>
          </button>
      </div>
      <div className="search_chat has-search">
          <span className="fas fa-search form-control-feedback"></span>
          <input className="form-control chat_input" id="search-contact" type="text" placeholder="" />
      </div>
      
      <TextContainer users={users} actualUser={name} allRooms={allRooms} publicRooms={publicRooms} actualTab={actualTab} actualRoom={room} />
  </div>

);

export default InfoBar;