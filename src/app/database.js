const mysql = require("mysql2");

const connection = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "root",
  port: "3306",
  database: "coderlch",
});

connection.getConnection((_, c) => {
  c.connect((er) => {
    if (!er) console.log("数据库连接成功");
  });
});

module.exports = connection.promise();
