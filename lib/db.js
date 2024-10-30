// lib/db.js - 数据库连接配置
import mysql from 'mysql2/promise'

// export async function getConnection() {
//   return await mysql.createConnection({
//     host: 'localhost',
//     user: 'root',
//     password: '',
//     database: 'todo_db'
//   })
// }

// 创建数据库连接池
const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'todo_db',
  waitForConnections: true,
  connectionLimit: 10,        // 连接池大小
  queueLimit: 0,             // 队列限制，0表示不限制
  enableKeepAlive: true,     // 保持连接活跃
  keepAliveInitialDelay: 0   // 初始延迟
})
// 监控连接池状态



export default pool