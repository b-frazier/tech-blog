// packages
const express = require('express');
const session = require('express-session');
const exphbs = require('express-handlebars');
// files
const helpers = require('./utils/helpers');
const routes = require('./controllers');
// sequelize connections
const sequelize = require('./config/connection');
const sequelizeStore = require('connect-session-sequelize');
session.Store;

const app = express();
const PORT = process.env.PORT || 3001;

const hbs = exphbs.create({ helpers });

// configuration for the session
const sess = {
  secret: 'pinky promise',
  cookie: {
    maxAge: 30000,
    httpOnly: true,
    secure: false,
    sameSite: 'strict',
  },
  resave: false,
  saveUninitialized: true,
  store: new sequelizeStore({
    db: sequelize,
  }),
};
