const connection = require("../app/database");

class MomentService {
  async create(user_id, content) {
    const statement = "INSERT INTO moment (content, user_id) VALUES (?,?)";
    const result = await connection.execute(statement, [content, user_id]);
    return result;
  }

  /** 查询某条动态，不包含评论 */
  // async getSingle(momentId) {
  //   const statement = `
  //     SELECT
  //       m.id id, m.content content, m.updateAt updateTime,
  //       JSON_OBJECT('id', u.id, 'name',u.name) userInfo
  //     FROM moment m LEFT JOIN users u ON m.user_id = u.id WHERE m.id = ?
  //     `;

  //   const result = await connection.execute(statement, [momentId]);
  //   return result;
  // }

  /** 查询某条动态，包含评论 */
  async getSingle(momentId) {
    const statement = `
        SELECT 
        m.id id, m.content content, m.updateAt updateTime,
        JSON_OBJECT('id', u.id, 'name',u.name) userInfo,
        JSON_ARRAYAGG(
          JSON_OBJECT('id', c.id, 'content', c.content, 'commentId', c.comment_id,
          'user', JSON_OBJECT('id', cu.id, 'name',cu.name))
        ) comments
      FROM moment m 
      LEFT JOIN users u ON m.user_id = u.id 
      LEFT JOIN comment c ON c.moment_id = m.id
      LEFT JOIN users cu ON c.user_id = cu.id
      WHERE m.id = ?
      GROUP BY m.id;
      `;

    const result = await connection.execute(statement, [momentId]);
    return result;
  }

  async getMulti(pagesize, offset) {
    const statement = `
    SELECT 
        m.id id, m.content content, m.updateAt updateTime,
        JSON_OBJECT('id', u.id, 'name',u.name) userInfo,
        (SELECT COUNT(*) FROM comment c WHERE c.moment_id = m.id) commentCount
    FROM moment m LEFT JOIN users u ON m.user_id = u.id 
    LIMIT ?,?
    `;
    const result = await connection.execute(statement, [pagesize, offset]);
    return result;
  }

  async update(content, momentId) {
    console.log("content, momentId", content, momentId);
    const statement = `UPDATE moment SET content = ? WHERE id = ?;`;
    const result = await connection.execute(statement, [content, momentId]);
    return result;
  }

  async deleteSingle(momentId) {
    const statement = `DELETE FROM moment WHERE moment.id = ?;`;
    const result = await connection.execute(statement, [momentId]);
    return result;
  }

  async addLabel(moment_id, label_id) {
    const statement = `INSERT INTO moment_label (moment_id, label_id) VALUES (?, ?);`;
    const [result] = await connection.execute(statement, [moment_id, label_id]);
    return result;
  }

  async hasLabel(moment_id, label_id) {
    const statement = `SELECT * FROM moment_label WHERE moment_id= ? AND label_id = ?;`;
    const [[result]] = await connection.execute(statement, [moment_id, label_id]);
    return result ? true : false;
  }
}

module.exports = new MomentService();
