const usersRouter = require('express').Router();

const { getAllUser } = require('../controllers/users.controller');

usersRouter.get('/', getAllUser);

module.exports = usersRouter;