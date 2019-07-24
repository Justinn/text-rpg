const router = require('express').Router();
const { User } = require('../db/models');
const { playerHandler } = require('../game');

router.get('/auth', (req, res, next) => {
  res.json(req.user || {});
});

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
    const user = await User.scope('withoutPassword').findByPk(id);
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
    if (await findUserByName(username)) return res.sendStatus(400);
    const user = await User.create({ username, password, email });
    delete user.password;
    playerHandler.addPlayer(user);
    res.json(user).status(201);
  } catch (error) {
    next(error);
  }
});

router.put('/login', async (req, res, next) => {
  try {
    const { username, password } = req.body;
    let user = await User.findOne({
      where: { username: username, password: password },
    });
    if (password === user.password) {
      user = await User.scope('withoutPassword').findByPk(user.id);
      req.login(user, err => (err ? next(err) : res.json(user)));
    } else {
      const err = new Error('Incorrect username or password.');
      err.status = 401;
      throw err;
    }
  } catch (error) {
    next(error);
  }
});

router.delete('/logout', (req, res, next) => {
  req.logout();
  req.session.destroy(err => {
    if (err) return next(err);
    res.status(204).end();
  });
});

const findUserByName = async username => {
  const user = await User.scope('withoutPassword').findAll({
    where: { username: username },
  });
  if (user.length > 0) return user[0];
  else return false;
};

module.exports = router;
