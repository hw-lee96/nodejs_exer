const mysql = require('mysql');

module.exports = {
    name : 'rest-api',
    hostname : 'http://localhost',
    version : '0.0.1',
    env : process.env.NODE_ENV || 'development',
    port : process.env.PORT || 3000,
    db : {
        get : mysql.createConnection ({
            host : '127.0.0.1',
            username : 'root',
            password : 'asdf112!',
            database : 'nodejs',
        })
    }
}