const express = require('express');
const path = require('path');
const volleyball = require('volleyball');
const session = require('express-session');
const passport = require('passport');
const { db } = require('./db');
const { User } = require('./db/models');
const PORT = 43594;

const app = express();

//logging middleware
app.use(volleyball);

//body parsing middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//session middleware
app.use(
  session({
    secret: 'shhhh',
    resave: false,
    saveUninitialized: false,
  })
);

app.use(passport.initialize());
app.use(passport.session());

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.scope('withoutPassword').findByPk(id);
    done(null, user);
  } catch (err) {
    done(err);
  }
});

//static middleware
app.use(express.static(path.join(__dirname, '../public')));

app.use('/api', require('./api'));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/index.html'));
});

// error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(err.status || 500).send(err.message || 'Internal server error');
});

db.sync().then(() => {
  require('./game');
  console.log('db synced');
  app.listen(PORT, () => console.log(`Listening on Port: ${PORT}`));
});
