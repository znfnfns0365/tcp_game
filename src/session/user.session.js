import User from '../class/model/user.class.js';
import { userSessions } from './session.js';

export const addUser = (socket, userId, payload) => {
  const user = new User(socket, userId, payload);
  userSessions.push(user);
  return user;
};

export const removeUser = (socketOrUserId) => {
  let index;
  if (typeof socketOrUserId === 'object') {
    index = userSessions.findIndex((user) => user.socket === socketOrUserId);
  } else {
    index = userSessions.findIndex((user) => user.userId === socketOrUserId);
  }
  userSessions.splice(index, 1);
};

export const editUser = (socket, replacedId) => {
  removeUser(socket);
  addUser(socket, replacedId);
};

export const getUser = (socketOrUserId) => {
  if (typeof socketOrUserId === 'object') {
    return userSessions.find((user) => user.socket === socketOrUserId);
  } else {
    return userSessions.find((user) => user.userId === socketOrUserId);
  }
};

export const getAllUserSessions = () => {
  return userSessions;
};

export const clearSession = () => {
  userSessions.splice(0, userSessions.length);
};
