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

  /** 查询某条动态，包含评论、标签 */
  async getSingle(momentId) {
    // todo: 添加查询单条动态的标签
    const statement = `
      SELECT 
          m.id id, m.content content, m.updateAt updateTime,
          JSON_OBJECT('id', u.id, 'name',u.name) userInfo,
          IF(COUNT(c.id),JSON_ARRAYAGG(
            JSON_OBJECT('id', c.id, 'content', c.content, 'commentId', c.id,
            'user', JSON_OBJECT('id', cu.id, 'name',cu.name))
          ),NULL) comments,
          (SELECT IF(COUNT(l.id),JSON_ARRAYAGG(
            JSON_OBJECT('name',l.name, 'id',l.id)),NULL) FROM label l LEFT JOIN moment_label ml ON l.id = ml.label_id WHERE m.id = ml.moment_id) labels
      FROM moment m 
      LEFT JOIN users u ON u.id = m.user_id
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
        (SELECT COUNT(*) FROM comment c WHERE c.moment_id = m.id) commentCount,
				(SELECT COUNT(*) FROM moment_label ml WHERE ml.moment_id = m.id) labelCount
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
