const { database } = require('./connection');

class Poster {
  static async createPoster(params) {
    const sql = `
      INSERT INTO posters (image_link, content, link)
      VALUES ($1, $2, $3)
      RETURNING *;
      `;
    const result = await database.query(sql, params);
    return result.rows || [];
  }

}

module.exports = Poster;