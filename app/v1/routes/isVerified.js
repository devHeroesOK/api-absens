'use strict'

const jwt = require('jsonwebtoken')
const { myConfig } = require('../config/config')
const debug = require('debug')

async function isVerified (req, res, next){
    let log = debug('api-absens:isVerified')
    try {
        const bearerHeader = req.headers['authorization']
        const token = bearerHeader.split(' ')[1]
        const decoded = jwt.verify(token, myConfig.sessionSecret)
        log('decoded: ', decoded)
        req.user = decoded
        next()
    } catch (error) {
        return res.send({ status_code: 401, message: 'Invalid token! User auth failed.', error: error })
    }
}

module.exports = isVerified