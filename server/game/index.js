const Game = require('./GameHandler');
const PlayerHandler = require('./PlayerHandler');

const game = new Game();
const playerHandler = new PlayerHandler();

game.start();
playerHandler.start();

module.exports = { game, playerHandler };
