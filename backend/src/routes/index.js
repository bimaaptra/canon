const routersV1 = require('express').Router()
const { auth } = require('../middlewares/auth')

routersV1.use('/auth', require('./auth'))
routersV1.use('/claim-warranty', auth, require('./claim-warranty'))
routersV1.use('/customer', auth, require('./customer'))
routersV1.use('/offering', auth, require('./offering'))
routersV1.use('/service-in', auth, require('./service-in'))
routersV1.use('/service-out', auth, require('./service-out'))

module.exports = routersV1
