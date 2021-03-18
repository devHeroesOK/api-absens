'use strict'

const router = require('express').Router()
const index = require('../controllers/index')
const absen = require('../controllers/absen')
const cuti = require('../controllers/cuti')
const upload = require('../controllers/uploads')
const isVerified = require('./isVerified')

// INDEX
router.post('/HRD/api/v1/login', index.login)
router.get('/HRD/api/v1/home', [isVerified], index.home)

// absen
router.post('/HRD/api/v1/absen/masuk', upload.single('filename'), absen.absenMasuk)
// router.patch('/HRD/api/v1/absen/keluar/:id', [isVerified], absen.absenKeluar)

// cuti
router.post('/HRD/api/v1/cuti', [isVerified], cuti.createCuti)

module.exports = router