const routes = require('express').Router();

routes.use('/users', require('./users.router'));
routes.use('/auth', require('./auth.router'));

module.exports = routes