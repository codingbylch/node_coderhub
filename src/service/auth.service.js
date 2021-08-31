const connection = require("../app/database");

class AuthService {
  async checkResource(tableName, tableId) {
    const statement = `SELECT u.id FROM ${tableName} m LEFT JOIN users u ON m.user_id = u.id WHERE m.id = ?`;
    const result = await connection.execute(statement, [tableId]);
    return result;
  }
}

module.exports = new AuthService();
