const { database } = require('./connection');

class Info {
  static async countAdmin() {
    const sql = ` SELECT count(*) FROM admins; `;
    const result = await database.query(sql);
    return result.rows || [];
  }

  static async countUser() {
    const sql = ` SELECT count(*) FROM users; `;
    const result = await database.query(sql);
    return result.rows || [];
  }

  static async countPoster() {
    const sql = ` SELECT count(*) FROM posters; `;
    const result = await database.query(sql);
    return result.rows || [];
  }
}

module.exports = Info;