const router = require('express').Router();
const axios = require('axios');
const game = require('../game');

router.get('/info', (req, res, next) => {
    res.send(game)
})

module.exports = router;
