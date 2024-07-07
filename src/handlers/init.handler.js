import pools from '../DB/database.js';
import { makeTable } from '../DB/migration/createSchema.js';
import { createUser, findTable, findUserByDeviceID, getUserLocation } from '../DB/user/user_db.js';
import { initialGame } from '../server.js';
import { addUser, getUser } from '../session/user.session.js';

export const initHandler = async ({ socket, userId, payload }) => {
  try {
    // session에서 동일한 유저가 있는지 확인
    const userExist = getUser(userId);
    if (userExist) {
      throw new Error('이미 존재하는 userId 입니다.');
    }
    // 없다면 user session에 user 추가
    const user = addUser(socket, userId, payload);

    // initialGame에 user 추가
    initialGame.addUser(user);

    // DB에 테이블이 있는지 확인 없으면 테이블 생성
    const tableExist = await findTable('USER_DB', 'users');
    if (tableExist === 0) {
      console.log('DB에 users 테이블이 없습니다.');
      await makeTable('user_db.sql');
    }

    // DB에 user가 있는지 확인
    const userInDB = await findUserByDeviceID(userId);
    if (userInDB) {
      // 있다면 location 받아와서 user 객체에 저장하기
      const { x, y } = await getUserLocation(userId);
      user.updatePosition(x, y);

      // 클라이언트에 패킷 보내주기
      const packet = initialGame.getUsersLocationAsPacket();
      user.sendPacket(packet, 'user location is retrieved from DB');
      console.log(`${userId + "'s location\n"} x: ${user.x}, y: ${user.y}`);
    } else {
      // 없다면 컬럼 생성
      createUser(userId);
    }

    // 위치 업데이트 패킷 인터벌 생성
    // user.makeLocationInterval(initialGame);
  } catch (err) {
    console.error(err);
  }
};
