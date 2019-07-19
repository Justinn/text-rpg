const Sequelize = require('sequelize');

const db = new Sequelize(`postgres://localhost:5432/text-rpg`, {
  logging: false, // so we don't see all the SQL queries getting made
});

module.exports = db;