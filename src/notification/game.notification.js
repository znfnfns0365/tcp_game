import { config } from '../config/config.js';
import { PACKET_TYPE } from '../constants/header.js';
import { getProtoMessages } from '../init/loadProtos.js';

const makeNotification = (message, type) => {
  // 패킷 길이 정보를 포함한 버퍼 생성
  const packetLength = Buffer.alloc(config.packet.totalLength);
  packetLength.writeUInt32BE(
    message.length + config.packet.totalLength + config.packet.typeLength,
    0,
  );

  // 패킷 타입 정보를 포함한 버퍼 생성
  const packetType = Buffer.alloc(config.packet.typeLength);
  packetType.writeUInt8(type, 0);

  // 길이 정보와 메시지를 함께 전송
  return Buffer.concat([packetLength, packetType, message]);
};

export const createLocationPacket = (users) => {
  const protoMessages = getProtoMessages();
  const Location = protoMessages.location.LocationUpdate;

  // users: {locationData} 형식으로 proto 타입에 맞게 Packet 생성
  const payload = { users };
  const message = Location.create(payload);
  const locationPacket = Location.encode(message).finish();
  return makeNotification(locationPacket, PACKET_TYPE.Location);
};

// export const createPingPacket = (timestamp) => {
//   const protoMessages = getProtoMessages();
//   const ping = protoMessages.common.Ping;

//   const payload = { timestamp };
//   const message = ping.create(payload);
//   const pingPacket = ping.encode(message).finish();
//   return makeNotification(pingPacket, PACKET_TYPE.Ping);
// };
