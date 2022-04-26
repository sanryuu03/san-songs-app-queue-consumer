class Listener {
  constructor(SongsService, mailSender) {
    this._SongsService = SongsService;
    this._mailSender = mailSender;

    this.listen = this.listen.bind(this);
  }

  async listen(message) {
    try {
      const {userId, targetEmail} = JSON.parse(message.content.toString());

      const notes = await this._SongsService.getSongs(userId);
      const result = await this._mailSender.sendEmail(targetEmail, JSON.stringify(notes));
      console.log(result);
    } catch (error) {
      console.error(error);
    }
  }
}

module.exports = Listener;
