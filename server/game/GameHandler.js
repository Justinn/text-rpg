class Game {
  constructor() {
    this.serverTime = 0;
    this.tick = 1000;
    this.tokenTick = 10; //2 mins
    this.autoSaveTick = 15; //10 mins
  }

  start() {
    console.log('Starting game handler..');
  }

  getServerTime() {
    return this.serverTime;
  }
}

module.exports = Game;
