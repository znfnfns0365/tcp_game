import { getUser } from '../../session/user.session.js';
import pools from '../database.js';
import { SQL_QUERIES } from './user.queries.js';

export const findTable = async (databaseName, tableName) => {
  const [rows] = await pools.USER_DB.query(SQL_QUERIES.FIND_TABLE, [databaseName, tableName]);
  return rows[0]['count(*)'];
};

export const findUserByDeviceID = async (deviceId) => {
  const [rows] = await pools.USER_DB.query(SQL_QUERIES.FIND_USER_BY_DEVICE_ID, [deviceId]);

  return rows[0];
};

export const createUser = async (deviceId) => {
  console.log(`create user column with deviceId: ${deviceId}`);
  try {
    const user = await findUserByDeviceID(deviceId);
    if (user) {
      throw new Error(`${deviceId} is already exist`);
    }
    await pools.USER_DB.query(SQL_QUERIES.CREATE_USER, [deviceId]);
    return { deviceId };
  } catch (err) {
    console.error(err);
  }
};

export const getUserLocation = async (deviceId) => {
  const [rows] = await pools.USER_DB.query(SQL_QUERIES.GET_USER_LOCATION, [deviceId]);
  return rows[0];
};

export const saveUserLocation = async (user) => {
  const [rows] = await pools.USER_DB.query(SQL_QUERIES.SET_USER_LOCATION, [
    user.x,
    user.y,
    user.userId,
  ]);
};
