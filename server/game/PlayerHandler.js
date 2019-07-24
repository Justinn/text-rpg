const { User } = require('../db/models');

//Handles players that are currently online
class PlayerHandler {
  constructor() {
    this.players = [];
  }

  async start() {}

  //give new-messageeveryone X action tokens
  tokenServerUpdate(tokens, socket) {
    if (this.players.length > 0) {
      console.log(`Giving everyone ${tokens} action tokens.`);
      this.players.forEach(async player => {
        player.actionTokens += tokens;
        await User.update(
          { actionTokens: player.actionTokens },
          {
            where: { id: player.id },
          }
        );
        socket.emit('token-update', player.actionTokens);
      });
    }
  }

  //save all players on game server to db
  saveAll() {
    if (this.players.length > 0) {
      console.log('Saving all players..');
      this.players.forEach(async player => {
        try {
        } catch (error) {
          console.log(error.message);
        }
      });
      console.log(`Saved players`);
    }
  }

  addPlayer(player) {
    this.players.push(player);
    console.log(`${player.username} has joined.`);
    console.log(`There are now ${this.players.length} players online.`);
  }

  removePlayer(id) {
    const newList = this.players.filter(player => player.id !== id);
    this.players = newList;
    console.log(`There are now ${this.players.length} players online.`);
  }

  getPlayerBySocketId(id) {
    return this.players.filter(player => player.socketId === id)[0];
  }
}

module.exports = PlayerHandler;
