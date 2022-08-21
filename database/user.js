const { database } = require('./connection');

class User {
  static async getUsers() {
    const sql = `
      SELECT 
        id,
        first_name,
        username,
        chat_id,
        created_at,
        status
      FROM
        users u
      WHERE
        u.state = true
      ORDER BY u.id;
      `;

    const result = await database.query(sql);
    return result.rows || [];
  }

  static async deleteUser(params) {
    const sql = `
      UPDATE
        users u
      SET
        u.state = false
      WHERE id = $1
      RETURNING u.id, u.state;
    `;

    const result = await database.query(sql, params);
    return result.rows || [];
  }

  static async updateUser(params) {
    const sql = `
      UPDATE
        users u
      SET status = CASE WHEN u.status = true THEN false ELSE true END
      WHERE id = $1
      RETURNING u.id, u.status;
    `;
    const result = await database.query(sql, params);
    return result.rows || [];
  }

}

module.exports = User;