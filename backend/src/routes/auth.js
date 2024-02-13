const authRouter = require('express').Router()
const { login } = require('../controllers/auth')

authRouter.post('/login', login)

module.exports = authRouter
