const {Pool} = require('pg');

class SongsService {
  constructor() {
    this._pool = new Pool();
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
