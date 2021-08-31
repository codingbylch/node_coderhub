const connection = require("../app/database");

class CommentService {
  async create(content, moment_id, user_id) {
    console.log("sercice create");
    const statment = `INSERT INTO comment (content, moment_id, user_id) VALUES (?,?,?);`;
    const result = await connection.execute(statment, [content, moment_id, user_id]);
    return result;
  }

  async reply(content, moment_id, comment_id, user_id) {
    const statment = `INSERT INTO comment (content, moment_id, comment_id, user_id) VALUES (?,?,?,?);`;
    const result = await connection.execute(statment, [content, moment_id, comment_id, user_id]);
    return result;
  }

  async update(content, comment_id) {
    const statement = `UPDATE comment SET content = ? WHERE id = ?;`;
    const result = await connection.execute(statement, [content, comment_id]);
    return result;
  }

  async deleteSingle(comment_id) {
    const statement = `DELETE FROM comment WHERE id = ?;`;
    const result = await connection.execute(statement, [comment_id]);
    return result;
  }

  async querySingle(moment_id) {
    const statement = `
    SELECT c.id commentId, c.content, JSON_OBJECT('id',u.id,'name',u.name) user
    FROM comment c 
    LEFT JOIN moment m ON m.id = c.comment_id
    LEFT JOIN users u ON u.id = c.user_id
    WHERE m.id = ?
    `;
    const result = await connection.execute(statement, [moment_id]);
    return result;
  }
}

module.exports = new CommentService();

// todo：momentId不存在时，coderwhy的处理
