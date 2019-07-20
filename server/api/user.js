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

module.exports = router;
