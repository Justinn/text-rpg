const router = require('express').Router();
const { User } = require('../db/models');
const axios = require('axios');

router.get('/', async (req, res, next) => {
  try {
    const users = await User.findAll();
    res.json(users);
  } catch (error) {
    next(error);
  }
});

router.get('/:id', async (req, res, next) => {
  try {
    const id = req.params.id;
    const user = await User.findByPk(id);
    if (user) res.json(user);
    else res.send(404);
  } catch (error) {
    next(error);
  }
});

router.post('/signup', async (req, res, next) => {
  try {
    const { username, password, email } = req.body;
    //check if user exists
    if (await findUserByName(username)) return res.sendStatus(400)
    const user = await User.create({username, password, email});
    res.json(user).status(201);
  } catch (error) {
    next(error);
  }
});

const findUserByName = async (username) => {
  const user = await User.findAll({where: {username: username}});
  if (user.length > 0) return user;
  else return false;
}

module.exports = router;
