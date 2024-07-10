import { clients } from '../server.js';
import { userSessions } from '../session/session.js';
import { getUser, removeUser } from '../session/user.session.js';
import { onData } from './onData.js';
import { onEnd } from './onEnd.js';
// import { onError } from './onError.js';

export const onConnection = (socket) => {
  console.log(`Client connected from: ${socket.remoteAddress}:${socket.remotePort}`);

  clients.set(socket, Date.now());

  // 각 클라이언트마다 고유한 버퍼를 유지
  socket.buffer = Buffer.alloc(0);

  socket.on('data', onData(socket));

  socket.on('end', onEnd(socket));

  socket.on('error', (err) => {
    console.log(err);
    // onError(socket);
  });
};
