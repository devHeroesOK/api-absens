const _ = require('lodash')
const debug = require('debug')
const log = debug('api-absens:queries:')

async function create (formData) {
    log('create', formData)
    try {
        let query = `insert into master.tbl_master_cuti (vname_user, vharicuti, ttglcuti, valasan, tremarkscuti)
            values ('${formData.vname_user}', '${formData.vharicuti}', '${formData.ttglcuti}', '${formData.valasan}', '${formData.tremarkscuti}')`
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