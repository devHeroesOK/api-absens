const _ = require('lodash')
const debug = require('debug')
const moment = require('moment')
const scp = require('node-scp')
const path = require('path')
const axios = require('axios')
const Absen = require('../queries/absen')
const service = require('../services/ApiGeoLocation')
const { toUpper } = require('lodash')
const log = debug('api-absens:absen:')

async function absenMasuk (req, res) {
    let data = req.body
    let files = req.file
    let users = req.user
    log('absenMasuk', { data, files, users })
    try {
        return false
        // const uploadImage = await upload({ vname_user: data.vname_user, files })
        // if (users.vname_user !== toUpper(data.vname_user)) return res.json({ statusCode: 400, message: 'Maaf, ini bukan akun anda. Silahkan periksa kembali' })  
        const imageName = moment(Date.now()).format('YYYYMMDDhhmmss') + data.vname_user + path.extname(files.originalname)
        const url = service.api + 'v1/reverse'
        const params = {
            access_key: '98675a441e17a12ee1a4185e3ce3cbc7',
            query: '-6.200922, 106.81637',
            limit: 1
        }
        const response = await axios.get(
            url,
            { params }
        )
        log('response', response)

        return false
        let formData = {
            vname_user: toUpper(data.vname_user),
            tdate_masuk: data.tdate_masuk,
            image: imageName,
            tkoordinate: data.tkoordinate
        }
        const created = await Absen.create(formData)
        if (!created) return res.json({ statusCode: 400, message: 'Gagal menyimpan data. Silahkan coba lagi.' })

        return res.json({ statusCode: 200, message: 'Absen masuk berhasil!' })
    } catch (error) {
        throw error
    }
}

async function absenKeluar (req, res) {
    let data = req.body
    let param = req.params
    log('absenKeluar', { data, param })
    try {
        const { id } = param.id
        const  updated = await Absen.updateByUser(data.vname_user, id)
        if (!updated) return res.json({ statusCode: 400, message: 'Gagal mengubah data. Silahkan coba lagi.' })

        return res.json({ statusCode: 200, message: 'Absen keluar berhasil!', updated })
    } catch (error) {
        throw error
    }
}

async function upload ({ vname_user, files }) {
    log('uploadFile:', { vname_user, files })
    try {
        if (!vname_user) throw({ statusCode: 400, message: 'Username required.' })
        if (!files) throw({ statusCode: 400, message: 'Image required.' })
        const image = moment(Date.now()).format('YYYYMMDDhhmmss') + vname_user + path.extname(files.originalname)
        const client = await scp({
            host: 'hris.telmarksrv.com',
            port: 5791,
            username: 'root',
            password: 'q12345'
        })
        log('client:', client)
        await client.uploadFile(`./public/uploads/images/${image}`, `/HRD/images/absen/${image}`)
        // await client.list('/')
        client.close()
    } catch (error) {
        throw error
    }
}

module.exports = {
    absenMasuk,
    absenKeluar
}