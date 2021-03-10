const _ = require('lodash')
const debug = require('debug')
const log = debug('api-absens:queries:')

async function findByUsername (username) {
    log('findByUsername', username)
    try {
        const query = `select users.*, user_detail.email, user_detail.phone,
                       user_detail.address, user_detail.department, 
                       concat (user_detail.firstname, ' ', user_detail.lastname) as fullname from users
                       left join user_detail on user_detail.id = users.user_id 
                       where users.username = '${username}' and users.is_deleted = false`
        const response = await pool.query(query)
        log('response', response.rows[0])

        const result = response.rows[0]
        return result
    } catch (error) {
        throw error
    }
}

module.exports = {
    findByUsername
}