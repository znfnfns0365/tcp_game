import {
  CLIENT_VERSION,
  DB1_HOST,
  DB1_NAME,
  DB1_PASSWORD,
  DB1_PORT,
  DB1_USER,
  HOST,
  PORT,
  SERVER_HOST,
} from '../constants/env.js';
import { PACKET_TYPE_LENGTH, TOTAL_LENGTH } from '../constants/header.js';

export const config = {
  server: {
    port: PORT,
    host: HOST,
    allHost: SERVER_HOST,
  },
  client: {
    version: CLIENT_VERSION,
  },
  databases: {
    USER_DB: {
      name: DB1_NAME,
      user: DB1_USER,
      password: DB1_PASSWORD,
      host: DB1_HOST,
      port: DB1_PORT,
    },
  },
  packet: {
    totalLength: TOTAL_LENGTH,
    typeLength: PACKET_TYPE_LENGTH,
  },
};
