const debug = require('debug')
const _ = require('lodash')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const { myConfig } = require('../config/config')
const Users = require('../queries/users')
const salt = bcrypt.genSaltSync(10)
const log = debug('api-absens:index:')

async function login (req, res) {
    let data = req.body
    log('login', data)
    try {
        const { username, password } = req.body

        const exists = await Users.findByUsername(username)
        if (_.isEmpty(exists)) return res.status(404).json({ statusCode: 404, message: 'User not found.', data: [] })

        let validPassword = bcrypt.compare(password, exists.password, function (err, result) {
            log('passwordValid', result)

            if (!result) return res.status(400).json({ statusCode: 400, message: 'Invalid password. Please try again.' })

            const token = jwt.sign({ id: exists.id, username: exists.username }, myConfig.sessionSecret, { expiresIn: myConfig.expiredSessionTime })
            return res.status(200).json({ statusCode: 200, session: token, data: exists })
        })
        log(validPassword)
    } catch (error) {
        throw error
    }
}

async function home (req, res) {
    log('home')
    try {
        return res.status(200).json({ message: 'OK', data: {} })
    } catch (error) {
        throw error
    }
}

module.exports = {
    login,
    home
}