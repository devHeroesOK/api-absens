'use strict'

const router = require('express').Router()
const index = require('../controllers/index')
const isVerified = require('./isVerified')

// INDEX
router.post('/api/v1/login', index.login)
router.get('/api/v1/home', [isVerified], index.home)

module.exports = router