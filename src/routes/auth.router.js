const auth = require('express').Router();
const verifyToken = require('../middleware/verifyToken')
const {register, login, logout} = require('../controllers/auth.controller')
const {refreshToken} = require('../controllers/refreshToken.controller')
auth.post('/register', register)
auth.post('/login', login)
auth.delete('/logout', logout)
auth.get('/refresh_token', refreshToken)
module.exports = auth