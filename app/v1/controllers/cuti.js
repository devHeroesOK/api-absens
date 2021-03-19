const _ = require('lodash')
const debug = require('debug')
const moment = require('moment')
const Cuti = require('../queries/cuti')
const log = debug('api-absens:cuti:')

async function createCuti (req, res) {
    let data = req.body
    let users = req.user
    log('buatCuti', { data, users })
    try {
        // return false    
        if (users.vname_user !== _.toUpper(data.vname_user)) return res.json({ statusCode: 400, message: 'Maaf, ini bukan akun anda. Silahkan periksa kembali' })
        let formData = { 
            vname_user: _.toUpper(data.vname_user),  
            ttglcutimulai: data.ttglcutimulai, 
            ttglcutiakhir: _.isEmpty(data.ttglcutiakhir) ? data.ttglcutimulai : data.ttglcutiakhir,
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