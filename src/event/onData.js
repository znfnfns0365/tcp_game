import { config } from '../config/config.js';
import { PACKET_TYPE } from '../constants/header.js';
import { getHandlerById } from '../handlers/index.js';
import { getProtoMessages } from '../init/loadProtos.js';
import { packetParser } from '../utils/parser/packetParser.js';

export const onData = (socket) => async (data) => {
  socket.buffer = Buffer.concat([socket.buffer, data]);

  const totalHeaderLength = config.packet.totalLength + config.packet.typeLength;

  while (socket.buffer.length >= totalHeaderLength) {
    const length = socket.buffer.readUInt32BE(0);
    const packetType = socket.buffer.readUInt8(config.packet.totalLength);

    // 전체 패킷이 도착하지 않았다면 다시 패킷 수신 대기
    if (socket.buffer.length < length) {
      break;
    } else {
      // 전체 패킷이 도착함
      const packet = socket.buffer.slice(totalHeaderLength, length);
      socket.buffer = socket.buffer.slice(length);

      // console.log(`length: ${length}, packetType: ${packetType}`);
      // console.log(`packet: ${packet}`);

      try {
        switch (packetType) {
          case PACKET_TYPE.Ping:
            console.log(`PACKET_TYPE is 'Ping'\n\n\n`);
            break;
          case PACKET_TYPE.Normal:
            const { handlerId, userId, payload, version } = packetParser(packet);
            // console.log(`handlerId: ${handlerId}`);
            // console.log(`userId: ${userId}`);
            // console.log(payload);
            // console.log(`version: ${version}`);
            // console.log(`PACKET_TYPE is 'Normal'\n\n\n`);

            // 클라이언트 버전 확인
            if (version !== config.client.version) {
              throw new Error('클라이언트 버전이 일치하지 않습니다.');
            }

            // handler 실행
            const handler = getHandlerById(handlerId);
            await handler({ socket, userId, payload });

            break;
          case PACKET_TYPE.Location:
            console.log(`PACKET_TYPE is 'Location'\n\n\n`);
            break;
        }
      } catch (err) {
        console.log(err);
      }
    }
  }
};
