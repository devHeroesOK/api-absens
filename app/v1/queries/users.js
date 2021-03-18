const _ = require('lodash')
const debug = require('debug')
const log = debug('api-absens:queries:')

async function findByUsername (username, password) {
    log('findByUsername', { username, password })
    try {
        // const query = `select users.*, user_detail.email, user_detail.phone,
        //                user_detail.address, user_detail.department, 
        //                concat (user_detail.firstname, ' ', user_detail.lastname) as fullname from users
        //                left join user_detail on user_detail.id = users.user_id 
        //                where users.username = '${username}' and users.is_deleted = false`
        let query = `select vname_user, tpassword from master.tbl_master_user where vname_user = '${username}' and tpassword = '${password}'`
        const response = await pool.query(query)
        log('response', response.rows)
        if (_.isEmpty(response)) return response

        const result = response.rows[0]
        return result
    } catch (error) {
        throw error
    }
}

async function updateLogin (vname_user) {
    log('updateLogin', vname_user)
    try {
        let updateLoginDate = await pool.query(`
        
            update master.tbl_master_user set tdate_login = now() where vname_user = '${vname_user}';
            insert into history.tbl_history_login (vname_user, tdate_login, vaction) values('${vname_user}', now(), 'LOGIN')
            
            
            `)
            
        const response = { updateLoginDate }
        log('response', response)
        return response
    } catch (error) {
        throw error
    }
}

module.exports = {
    findByUsername,
    updateLogin
}