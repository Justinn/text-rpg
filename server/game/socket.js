const { game, playerHandler } = require('./');

module.exports = io => {
  io.on('connection', socket => {
    console.log(socket.id, ' has made a persistent connection to the server!');

    socket.on('login', user => {
      playerHandler.addPlayer(user);
    });

    socket.on('logout', id => {
      playerHandler.removePlayer(id);
    });

    setInterval(async () => {
      game.serverTime++;
      if (game.serverTime % game.tokenTick === 1) {
        await playerHandler.tokenServerUpdate(5, socket);
      }
      // if (game.serverTime % game.autoSaveTick === 1) {
      //   // playerHandler.saveAll();
      // }
    }, game.tick);

    socket.on('get-server-time', () => {
      socket.emit('server-time', game.serverTime);
    });
  });
};
