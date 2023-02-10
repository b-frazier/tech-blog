// calls in packages
const Sequelize = require('sequelize');
require('dotenv').config();

// declares as an empty variable so it can be reassigned
let sequelize;

// sets up the database to run for heroku or locally
if (process.env.JAWSDB_URL) {
  sequelize = new Sequelize(process.env.JAWSDB_URL);
} else {
  sequelize = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASSWORD,
    {
      host: 'localhost',
      dialect: 'mysql',
      port: 3306,
    }
  );
}

// exports so it can be used in the server file
module.exports = sequelize;
