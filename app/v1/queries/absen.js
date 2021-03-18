const _ = require('lodash')
const debug = require('debug')
const log = debug('api-absens:queries:')

async function create (formData) {
    log('create', formData)
    try {
        let query = `
        
            insert into master.tbl_master_absen (vname_user, tdate_insert, tdate_absen, tdate_masuk, tdate_keluar, vimage, tkoordinate)
            values ('${formData.vname_user}', now(), now(), '${formData.tdate_masuk}', null, '${formData.image}', '${formData.tkoordinate}');
            
            insert into history.tbl_history_absen (vname_user, tdate_insert, tdate_absen, tdate_masuk, tdate_keluar, vimage, tkoordinate)
            values ('${formData.vname_user}', now(), now(), '${formData.tdate_masuk}', null, '${formData.image}', '${formData.tkoordinate}')
            
            
            `
        // let query = `insert into files (username, filename) values ('${formData.username}', '${formData.image}')`
        const response = await pool.query(query)
        log('response', response)
        return response
    } catch (error) {   
        throw error
    }
}

module.exports = {
    create
}