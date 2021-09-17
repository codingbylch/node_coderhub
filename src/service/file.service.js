const connection = require("../app/database");
class FileService {
  async saveAvatorInfo(filename, mimetype, size, user_id) {
    const statement = `INSERT INTO avator (filename, mimetype, size, user_id) VALUES (?,?,?,?);`;
    const result = await connection.execute(statement, [filename, mimetype, size, user_id]);
    return result;
  }

  async getAvatorInfo(user_id) {
    const statement = `SELECT * FROM avator WHERE avator.user_id = ?;`;
    const [[result]] = await connection.execute(statement, [user_id]);
    return result;
  }

  async createFile(filename, mimetype, size, moment_id, user_id) {
    const statement = `INSERT INTO file (filename, mimetype, size, moment_id, user_id) VALUES (?,?,?,?,?);`;
    const result = await connection.execute(statement, [filename, mimetype, size, moment_id, user_id]);
    return result;
  }

  async getFileInfo(fileName) {
    const statement = `SELECT * FROM file WHERE file.filename = ?;`;
    const [[result]] = await connection.execute(statement, [fileName]);
    return result;
  }
}

module.exports = new FileService();
