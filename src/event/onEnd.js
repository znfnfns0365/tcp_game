import { saveUserLocation } from '../DB/user/user_db.js';
import { clients, initialGame } from '../server.js';
import { userSessions } from '../session/session.js';
import { getUser, removeUser } from '../session/user.session.js';

export const onEnd = (socket) => async () => {
  console.log('Client disconnected');
  clients.delete(socket);
  // 게임 객체에서 유저 및 인터벌 제거
  const user = getUser(socket);
  console.log(`Disconnected userId: ${user.userId}`);
  console.log(`X: ${user.x}, Y: ${user.y}`);
  initialGame.removeUser(user.userId);

  // db에 userId의 위치 정보 저장
  await saveUserLocation(user);
  console.log(`User location is saved`);

  // 유저 세션에서 유저 삭제
  removeUser(socket);
};
