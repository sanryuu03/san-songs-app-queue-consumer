const {Pool} = require('pg');

class SongsService {
  constructor() {
    this._pool = new Pool({
      user: 'san',
      host: 'localhost',
      database: 'openmusicv1',
      password: 'leviana250520',
      port: 5432,
    });
  }

  async getSongs(userId) {
    const query = {
      text: `SELECT songs.* FROM songs
      LEFT JOIN playlist_songs ON songs.id = playlist_songs.song_id
      WHERE playlist_songs.playlist_id = $1
      GROUP BY songs.id`,
      values: [userId],
    };
    const result = await this._pool.query(query);
    return result.rows;
  }
}

module.exports = SongsService;
