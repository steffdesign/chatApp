const users = [];
const rooms = [];

const addUser = ({ id, name, room, privateRoom }) => {
  name = name.trim().toLowerCase();
  room = room.trim().toLowerCase();

  const existingUser = users.find((user) => user.room === room && user.name === name);

  if (!name || !room) return { error: 'Username and room are required.' };

  const user = { id, name, room, privateRoom };

  if (existingUser) return { user };

  const roomByUser = {name, room, privateRoom};
  
  users.push(user);

  const existingRoom = rooms.find(user => user.room === room);
  if (!existingRoom) addRoom(roomByUser)
  
  return { user };
}

const addRoom = ({name, room, privateRoom }) => {
  name = name.trim().toLowerCase();
  room = room.trim().toLowerCase();
  const existingRoom = rooms.find(user => user.room === room);

  const roomByUser = {name, room, privateRoom};
  
  if(!existingRoom) rooms.push(roomByUser);
  return rooms;
}

const getRooms = rooms;

const getRoomsByUser = (name) => {
  const roomsByUser = rooms.find((room) => room.name === name);
  return roomsByUser;
}

const removeUser = (id) => {
  const index = users.findIndex((user) => user.id === id);

  if(index !== -1) return users.splice(index, 1)[0];
}

const getUser = (id) => users.find((user) => user.id === id);

const getUsersInRoom = (room) => users.filter((user) => user.room === room);

const getAllRoomsByUser = (name) => users.filter((user) => user.name === name);

const getUserByNameAndRoom = (name, room) => users.filter(user => user.name === name && user.room == room);

module.exports = { addUser, removeUser, getUser, getUsersInRoom, getRooms, addRoom, getRoomsByUser, getAllRoomsByUser, getUserByNameAndRoom };