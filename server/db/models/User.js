const { db } = require('../');
const Sequelize = require('sequelize');

const User = db.define(
  'user',
  {
    username: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    password: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    email: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    actionTokens: {
      type: Sequelize.INTEGER,
      defaultValue: 100,
    },
  },
  {
    scopes: {
      withoutPassword: {
        attributes: { exclude: ['password'] },
      },
    },
  }
);

module.exports = User;
