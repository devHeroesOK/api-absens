'use strict'

require('dotenv').config()

const express = require('express')
const bodyParser = require('body-parser')
const path = require('path')
const port = process.env.PORT || 3000
const passport = require('passport')
const cors = require('cors')
const cookieParser = require('cookie-parser')
const app = express()
const http = require('http')		
const conn = require('./app/v1/config/db.config')
const routes = require('./app/v1/routes/index')
const multer = require('multer')
// const sequelize = require('./apps/v1/config/db.config')
// const myConfig = require('./apps/v1/config/config')

app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ limit: '5mb', extended: true }))
app.use(cookieParser())
app.use(express.static(path.join(__dirname, '/public')))

require("./app/v1/config/passport")(passport)
app.use(passport.initialize())
app.use(passport.session())

app.use('/', routes)

// sequelize
//     .authenticate()
//     .then(function () {
//         console.log('Connected to database.');
//     })
//     .catch(function (err) {
//         console.log('Failed to connect : ', err);
//     });

const httpServer = http.createServer(app)
httpServer.listen(port, () => {
	let port = httpServer.address().port
	console.log("Server running on http://localhost:" + port)
})