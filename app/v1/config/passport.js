'use strict'

const { isEmpty } = require('lodash')
const localStrategy = require('passport-local').Strategy
const passportJWT = require('passport-jwt')
const JWTStrategy = passportJWT.Strategy
const ExtractJWT = passportJWT.ExtractJwt
const bcrypt = require('bcrypt')
const debug = require('debug')
const log = debug('api-absens:serialize')

module.exports = function (passport) {
    passport.serializeUser((user, done) => {
        log('seriaLizeUser', user)
        done(null, user)
    })

    passport.deserializeUser(async (vname_user, tpassword, done) => {
        log('deserializeUser', { vname_user, tpassword })
        try {
            const query = `select * from master.tbl_master_user where vname_user = '${vname_user}' and tpassword = '${tpassword}'`
            let user = await pool.query(query, (err, result) => {
                if (err) return err

                if(!isEmpty(result)) {
                    log('user', result)
                    return done(null, result)
                } else {
                    return done(null, false)
                }
            })
        } catch (error) {
            throw error
        }
    })
    
    passport.use('login', new localStrategy( async (nip, password, done) => {
        try {
            const query = `select users.* from users where users.id='${id}' and users.password='${password}'`
            let user = await pool.query(``, (err, result) => {
                if (err) return err

                if (!isEmpty(result)) {
                    log('localStrategy', result)
                    return done(null, result)
                } else {
                    return done(null, false)
                }
            })
            log('user', user)
        } catch (error) {
            throw error
        }
    }))
        
    passport.use(
        new JWTStrategy(
        {
            jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
            secretOrKey: "topSecret!"
        },
        (async (jwtPayload, done) => {
            log('jwtPassport', { jwtPayload })
            try {
               return done(null, jwtPayload)
            } catch (error) {
                done(error)
            }
        }) 
    ))
}