const connection = require("../app/database");

class LabelService {
  async create(name) {
    const statement = `INSERT INTO label (name) VALUES (?)`;
    const [result] = await connection.execute(statement, [name]);
    console.log("create_result", result);
    return result;
  }

  async query(name) {
    const statement = `SELECT * FROM label WHERE name = ?`;
    const [[result]] = await connection.execute(statement, [name]);
    return result;
  }

  async queryList(offset, limit) {
    const statement = `SELECT * FROM label LIMIT ?, ?`;
    const [result] = await connection.execute(statement, [offset, limit]);
    return result;
  }
}

module.exports = new LabelService();
