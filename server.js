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
