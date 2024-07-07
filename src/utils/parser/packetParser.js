import { config } from '../../config/config.js';
import { getProtoTypeNameByHandlerId } from '../../handlers/index.js';
import { getProtoMessages } from '../../init/loadProtos.js';

export const packetParser = (data) => {
  const protoMessages = getProtoMessages();

  // 공통 패킷 구조 디코딩
  const Packet = protoMessages.common.Packet;
  let packet;
  try {
    packet = Packet.decode(data);
  } catch (e) {
    throw new Error('패킷 디코딩 중 오류가 발생했습니다.');
  }
  const handlerId = packet.handlerId;
  const userId = packet.userId;
  const version = packet.version;

  // handlerId로 프로토타입 가져오기
  const protoTypeName = getProtoTypeNameByHandlerId(handlerId);
  if (!protoTypeName) {
    throw new Error(`알 수 없는 핸들러 ID: ${handlerId}`);
  }

  // proto(payloadType 역할) 가져오기
  const [namespace, typeName] = protoTypeName.split('.');
  const PayloadType = protoMessages[namespace][typeName];

  // payload 디코딩
  let payload;
  try {
    payload = PayloadType.decode(packet.payload);
  } catch (e) {
    console.log(e);
    throw new Error('패킷 디코딩 중 오류가 발생했습니다.');
  }

  // 사실상 decode 과정에 verify가 포함되어 꼭 필요하지 않음
  const errorMessage = PayloadType.verify(payload);
  if (errorMessage) {
    throw new Error(`패킷 구조가 일치하지 않습니다: ${errorMessage}`);
  }

  // 필드가 비어있는(누락된) 경우
  const expectedFields = Object.keys(PayloadType.fields);
  const actualFields = Object.keys(payload);
  const missingFields = expectedFields.filter((field) => !actualFields.includes(field));
  if (missingFields.length > 0) {
    throw new Error(`필수 필드가 누락되었습니다: ${missingFields.join(', ')}`);
  }
  return { handlerId, userId, payload, version };
};
