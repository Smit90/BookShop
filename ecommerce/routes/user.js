const express = require('express')
const router = express.Router()

const { sayHI } = require('../controllers/user');

router.get('/', sayHI)

module.exports = router;