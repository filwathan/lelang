const usersRouter = require('express').Router();
const { verifyToken } = require('../middleware/verifyToken')
const { getAllUser } = require('../controllers/users.controller');

usersRouter.get('/', verifyToken, getAllUser);

module.exports = usersRouter;