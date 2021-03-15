const Pool = require('pg').Pool
global.pool = new Pool({
    user: 'postgres',
    host: 'hris.telmarksrv.com',
    database: 'hrd',
    password: 'superman',
    port: 5432  
})

// user: 'postgres',
// host: 'hris.telmarksrv.com',
// database: 'hrd',
// password: 'superman',
// port: 5432  

module.exports = pool