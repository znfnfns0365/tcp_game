import mysql from 'mysql2/promise';
import { config } from '../config/config.js';

const { databases } = config;

const createPool = (dbConfig) => {
  const pool = mysql.createPool({
    host: dbConfig.host,
    port: dbConfig.port,
    user: dbConfig.user,
    password: dbConfig.password,
    database: dbConfig.name,
    waitForConnections: true,
    connectionLimit: 10, // 커넥션 풀에서 최대 연결 수
    queueLimit: 0, // 0일 경우 무제한 대기열
  });

  const originalQuery = pool.query;

  pool.query = (sql, params) => {
    // 쿼리 실행시 로그
    console.log(`Executing query: ${sql} ${params ? `, ${JSON.stringify(params)}` : ``}`);
    return originalQuery.call(pool, sql, params);
  };

  return pool;
};

// 여러 데이터베이스 커넥션 풀 생성
const pools = {
  USER_DB: createPool(databases.USER_DB),
};

export default pools;
