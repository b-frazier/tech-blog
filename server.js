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

// use the session we just configured
app.use(session(sess));

// tell express what template engine to use
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

// express middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

// tells express to use controllers
app.use(routes);

// sync and start the server
sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => console.log('Now listening'));
});
