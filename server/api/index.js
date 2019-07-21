const router = require('express').Router();

router.use('/user', require('./user'));
router.use('/game', require('./game'));

router.use((req, res, next) => {
  const error = new Error('API Not Found');
  error.status = 404;
  next(error);
});

module.exports = router;
