const connection = require("../app/database");

class UserService {
  async create(userInfo) {
    const { username, password } = userInfo;
    const statement = "INSERT INTO users (name, password) VALUES (?,?);";
    // 将user存储到数据库中
    const result = await connection.execute(statement, [username, password]);

    return result;
  }

  async getUserByName(name) {
    const statement = "SELECT * FROM users WHERE users.name = ?;";
    const [result] = await connection.execute(statement, [name]);
    console.log("result", result);
    return result;
  }

  async updateAvatorUrlById(user_id, avatorUrl) {
    const statement = "UPDATE users SET avator_url = ? WHERE id = ?;";
    const result = await connection.execute(statement, [avatorUrl, user_id]);
  }
}

module.exports = new UserService();
