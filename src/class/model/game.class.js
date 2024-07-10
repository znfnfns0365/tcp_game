import { createLocationPacket } from '../../utils/notification/game.notification.js';
import IntervalManager from '../manager/interval.manager.js';

const MAX_PLAYERS = 10;

class Game {
  constructor(gameId) {
    this.gameId = gameId;
    this.users = [];
    this.intervalManager = new IntervalManager();
    this.state = 'playing';
  }

  addUser(user) {
    // max_players check
    if (this.users.length >= MAX_PLAYERS) {
      throw new Error('Max player in this game');
    }
    this.users.push(user);
  }

  getUser(userId) {
    return this.users.find((user) => user.userId === userId);
  }

  removeUser(userId) {
    this.users = this.users.filter((user) => user.userId !== userId);
    this.intervalManager.removeUserInterval(userId);
  }

  getMaxLatency() {
    let maxLatency = 0;
    for (const user of this.users) {
      maxLatency = Math.max(maxLatency, user.latency);
    }
    return maxLatency;
  }

  // 게임 전체 유저들의 위치 패킷 생성
  getUsersLocationAsPacket(userId) {
    const maxLatency = this.getMaxLatency();

    const locationData = this.users
      .filter((user) => userId !== user.userId)
      .map((user) => {
        // const { x, y } = user.deadReckoning(maxLatency);
        return { id: user.userId, playerId: user.playerId, x: user.x, y: user.y };
      });
    // console.log(users.length);
    return createLocationPacket(locationData);
  }
}

export default Game;
