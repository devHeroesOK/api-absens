let watch = false
let instances = 1
let exec_mode = 'fork'

module.exports = {
    apps: [
        {
            name: 'api-absens',
            cwd: '/var/www/html/HRD/api/',
            script: './server.js',
            exp_backoff_restart_delay: 100,
            instances,
            exec_mode,
            max_memory_restart: '1G',
            autorestart: true,
            env: {
                Z: 'Asia/Jakarta',
                NAMESPACE: 'api-absens',
                APPID: 4,
                PORT: 3004,
                VERSION: '1.0.0',
                NODE_ENV: 'development',
                DEBUG: "api-absens:*,queries:*"
            }
        }
    ]
}
