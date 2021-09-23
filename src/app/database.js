const mysql = require("mysql2");
const dotenv = require("dotenv");
dotenv.config();

const { MYSQL_HOST, MYSQL_PORT, MYYSQL_DATABASE, MYSQL_USER, MYSQL_PASSWORD } = process.env;

const connection = mysql.createPool({
  host: MYSQL_HOST,
  user: MYSQL_USER,
  password: MYSQL_PASSWORD,
  port: MYSQL_PORT,
  database: MYYSQL_DATABASE,
});

connection.getConnection((_, c) => {
  c.connect((er) => {
    if (!er) console.log("数据库连接成功");
  });
});

module.exports = connection.promise();
