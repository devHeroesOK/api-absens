const _ = require('lodash')
const debug = require('debug')
const moment = require('moment')
const log = debug('api-absens:queries:')

async function create (formData) {
    log('create', formData)
    try {
        const startDate = moment(formData.ttglcutimulai, 'YYYY-MM-DD')
        const endDate = moment(formData.ttglcutiakhir, 'YYYY-MM-DD')
        const vharicuti = moment.duration(endDate.diff(startDate)).asDays() + 1
        log('vharicuti', vharicuti)
       
        let query = `
        
            insert into master.tbl_master_cuti (vname_user, vharicuti, ttglcutimulai, ttglcutiakhir, valasan, tremarkscuti)
            values ('${formData.vname_user}', '${vharicuti}', '${formData.ttglcutimulai}', '${formData.ttglcutiakhir}', '${formData.valasan}', '${formData.tremarkscuti}');
            
            insert into history.tbl_history_cuti (vname_user, vharicuti, ttglcutimulai, ttglcutiakhir, valasan, tremarkscuti)
            values ('${formData.vname_user}', '${vharicuti}', '${formData.ttglcutimulai}', '${formData.ttglcutiakhir}', '${formData.valasan}', '${formData.tremarkscuti}')
            
            `
        
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