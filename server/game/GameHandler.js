class Game {
  constructor() {
    this.serverTime = 0;
    this.tick = 1000;
  }

  start() {
    console.log('Starting game handler..')
    setInterval(() => {
        this.serverTime++;
    }, this.tick);
  }

  getServerTime() {
      return this.serverTime;
  }
}

module.exports = Game;
