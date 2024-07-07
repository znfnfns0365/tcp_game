import Game from '../class/model/game.class.js';
import { gameSessions } from './session.js';

export const addGame = (gameId) => {
  const game = new Game(gameId);
  gameSessions.push(game);
  return game;
};

export const removeGame = (socketOrGameId) => {
  let index;
  if (typeof socketOrGameId === 'object') {
    index = gameSessions.findIndex((game) => game.socket === socketOrGameId);
  } else {
    index = gameSessions.findIndex((game) => game.gameId === socketOrGameId);
  }
  gameSessions.splice(index, 1);
};

export const editGame = (socket, replacedId) => {
  removeGame(socket);
  addGame(socket, replacedId);
};

export const getGame = (gameId) => {
  return gameSessions.find((game) => game.gameId === gameId);
};

export const getAllGameSessions = () => {
  return gameSessions;
};

export const clearSession = () => {
  gameSessions.splice(0, gameSessions.length);
};
