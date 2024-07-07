import { addGame } from '../../session/game.session.js';

export const initGame = (gameId) => {
  try {
    const game = addGame(gameId);
    console.log(game);
    return game;
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};
