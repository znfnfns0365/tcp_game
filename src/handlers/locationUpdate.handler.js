import { clients, initialGame } from '../server.js';
import { getUser } from '../session/user.session.js';

export const locationUpdateHandler = async ({ socket, userId, payload }) => {
  try {
    // init이 완료되었을 때만 실행

    // session에 유저가 있는지 확인
    const user = getUser(userId);
    if (!user) {
      throw new Error('존재하지 않는 userId 입니다.');
    }

    // initialGame에 user가 있는지 확인
    const existUser = initialGame.getUser(userId);
    if (!existUser) {
      throw new Error(`initialGame에 ${userId}가 존재하지 않습니다.`);
    }
    // user 위치 업데이트
    user.updatePosition(payload.x, payload.y);

    // 모든 user의 위치 정보 직렬화 후 클라이언트에 패킷 전송
    const packet = initialGame.getUsersLocationAsPacket(userId);
    if (clients.has(socket)) {
      socket.write(packet);
      // user.sendPacket(packet, 'Send users location information to client');
    }
    // Device Id에 빈 값을 넣지 않으면 packet을 보내지 않음
    // 빈 값을 넣으면 따로 캐릭터가 하나 더 생성되어 0,0에 고정되어있음
    // 0, 0을 보내고 있긴 한데, user.class deadReckoning
  } catch (err) {
    console.error(err);
  }
};
