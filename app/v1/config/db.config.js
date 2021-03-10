const Pool = require('pg').Pool
global.pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'api_absens',
    password: 'Ainul_07',
    port: 5432  
})

module.exports = pool