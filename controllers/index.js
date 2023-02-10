// gets router from express
const router = require('express').Router();

// declare path names for routes
const apiRoutes = require('./api');
const homeRoute = require('./homeRoute');

// uses the path
router.use('/', homeRoute);
router.use('/api', apiRoutes);

// exports the routes
module.exports = router;
