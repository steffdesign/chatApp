const http = require('http');
const express = require('express');
const socketio = require('socket.io');
const cors = require('cors');

const { addUser, removeUser, getUser, getUsersInRoom, getRooms, getRoomsByUser, getAllRoomsByUser, getUserByNameAndRoom } = require('./users');

const router = require('./router');

const app = express();
const server = http.createServer(app);
const io = socketio(server);

app.use(cors());
app.use(router);

io.on('connect', (socket) => {
  socket.on('join', ({ name, room, privateRoom }, callback) => {
    const { error, user } = addUser({ id: socket.id, name, room, privateRoom });

    if(error) return callback(error);

    socket.join(user.room);

    socket.emit('message', { user: 'admin', text: `${user.name}, welcome to room ${user.room}.`, room: `${user.room}`});
    socket.broadcast.to(user.room).emit('message', { user: 'admin', text: `${user.name} has joined!`, room: `${user.room}` });

    io.to(user.room).emit('roomData', { room: user.room, users: getUsersInRoom(user.room), rooms: getRooms, roomsUser: getRoomsByUser(user.name), allRoomsByUser: getAllRoomsByUser(user.name)});

    callback();
  });

  socket.on('sendMessage', (message, callback) => {
    const user = getUser(socket.id);

    if (user){
      io.to(user.room).emit('message', { user: user.name, text: message, room: user.room });
    }else{
      const newUser = getUserByNameAndRoom(message.user, message.room);
      if (newUser){
        io.to(newUser.room).emit('message', { user: newUser.name, text: message, room: newUser.room });
      }
    }

    callback();
  });

  socket.on('disconnect', () => {
    const user = removeUser(socket.id);

    if(user) {
      io.to(user.room).emit('message', { user: 'Admin', text: `${user.name} has left.`, room: `${user.room}` });
      io.to(user.room).emit('roomData', { room: user.room, users: getUsersInRoom(user.room), rooms: getRooms, roomsUser: getRoomsByUser(user.name), allRoomsByUser: getAllRoomsByUser(user.name)});
    }
  })
});

server.listen(process.env.PORT || 5000, () => console.log(`Server has started.`));