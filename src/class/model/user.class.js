// import { createPingPacket } from '../../notification/game.notification.js';

class User {
  constructor(socket, userId, payload) {
    this.socket = socket;
    this.userId = userId;
    this.x = 0;
    this.y = 0;
    this.lastUpdateTime = Date.now();
    this.latency = payload.latency;
    this.playerId = payload.playerId;
  }

  updatePosition(x, y) {
    this.x = x;
    this.y = y;
    this.lastUpdateTime = Date.now();
  }

  sendPacket(packet, message) {
    // this.socket.write(packet);
    // console.log(message);
    // 패킷을 보내면 캐릭터가 맘대로 움직임
  }

  makeLocationInterval(game) {
    game.intervalManager.addUserInterval(
      this.userId,
      () => {
        const locationPacket = game.getUsersLocationAsPacket();
        this.sendPacket(locationPacket, 'location packet sended');
      },
      1000,
      'location update',
    );
  }

  // ping() {
  //   const pingPacket = createPingPacket(Date.now());
  //   console.log(`Client send ping to ${this.userId}`);
  //   this.socket.write(pingPacket);
  // }

  // handlePong(data) {
  //   this.latency = (Date.now() - data.timestamp) / 2;
  //   console.log(`Received pong from user ${this.userId} with latency ${this.latency}ms`);
  // }
  // 핑퐁부터 만들고 latency 구한 다음에/ game.class에서 ping으로 interval 만들고 location도 인터벌로 만들기
  // 근데 일단 ping부터만

  deadReckoning(latency) {
    const timedGap = latency / 1000;
    const speedX = 1;
    const speedY = 1;
    const distanceX = speedX * timedGap;
    const distanceY = speedY * timedGap;
    return { x: this.x, y: this.y };
    // return {
    //   x: this.x + distanceX,
    //   y: this.y + distanceY,
    // };
  }
}

export default User;
