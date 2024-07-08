import { HANDLER_IDS } from '../constants/handlerIds.js';
import { locationUpdateHandler } from './locationUpdate.handler.js';
import { initHandler } from './init.handler.js';

const handlers = {
  [HANDLER_IDS.Init]: {
    handler: initHandler,
    protoType: 'initial.InitialPayload',
  },
  [HANDLER_IDS.LocationUpdate]: {
    handler: locationUpdateHandler,
    protoType: 'location.LocationUpdatePayload',
  },
};

export const getHandlerById = (handlerId) => {
  if (!handlers[handlerId]) {
    throw new Error(`핸들러를 찾을 수 없습니다: ID ${handlerId}`);
  }
  return handlers[handlerId].handler;
};

export const getProtoTypeNameByHandlerId = (handlerId) => {
  if (!handlers[handlerId]) {
    throw new Error(`프로토타입을 찾을 수 없습니다: ID ${handlerId}`);
  }
  return handlers[handlerId].protoType;
};
