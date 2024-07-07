export const SQL_QUERIES = {
  FIND_TABLE:
    'SELECT count(*) FROM information_schema.tables WHERE table_schema = ? AND table_name = ?',
  FIND_USER_BY_DEVICE_ID: 'SELECT * FROM users WHERE device_id = ?',
  CREATE_USER: 'INSERT INTO users (device_id) VALUES (?)',
  GET_USER_LOCATION: 'SELECT x, y FROM users WHERE device_id = ?',
  SET_USER_LOCATION: 'UPDATE users SET x = ?, y = ? WHERE device_id = ?',
};
