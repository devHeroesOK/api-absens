const _ = require('lodash')
const debug = require('debug')
const moment = require('moment')
const Cuti = require('../queries/cuti')
const log = debug('api-absens:cuti:')

async function createCuti (req, res) {
    let data = req.body
    log('buatCuti', data)
    try {
        let formData = { 
            vname_user: data.vname_user, 
            vharicuti: data.vharicuti, 
            ttglcuti: data.ttglcuti, 
            valasan: data.valasan, 
            tremarkscuti: data.tremarkscuti 
        } 
        const created = await Cuti.create(formData)
        if (!created) return res.json({ statusCode: 400, message: 'Gagal menyimpan data. Silahkan coba lagi.' })

        return res.json({ statusCode: 200, message: 'Cuti berhasil dibuat.' })
    } catch (error) {
        throw error
    }
}

module.exports = {
    createCuti
}