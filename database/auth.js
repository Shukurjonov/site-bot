const { database } = require('./connection');

class Auth {

  static async login(params) {
    const sql = `
      SELECT
        u.id,
        first_name,
        last_name,
        username,
        role
      FROM admins u
      WHERE username = $1::varchar AND password = md5(md5($2::text)) AND u.state = true;
    `;

    const result = await database.query(sql, params);
    return result.rows || [];
  }

  static async register(params) {
    const sql = `
      INSERT INTO admins (
        first_name,
        last_name,
        username,
        password
        )
      VALUES ($1::varchar, $2::varchar, $3::varchar, md5(md5($4::text)))
      RETURNING id, first_name, last_name, username, role;
    `;

    const result = await database.query(sql, params);
    return result.rows || [];
  }

}

module.exports = Auth;