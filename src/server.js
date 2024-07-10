import net from 'net';
import { config } from './config/config.js';
import { initServer } from './init/index.js';
import { onConnection } from './event/onConnection.js';
import { initGame } from './init/setting/init.game.js';
import { findTable } from './DB/user/user_db.js';

export const clients = new Map();
const server = net.createServer(onConnection);
export const initialGame = initGame('Initial Game');

initServer()
  .then(() => {
    server.listen(config.server.port, config.server.allHost, () => {
      console.log(`서버가 ${config.server.allHost}:${config.server.port}에서 실행중입니다.`);
      console.log(server.address());
    });
  })
  .catch((e) => {
    console.log(e);
    process.exit(1);
  });
