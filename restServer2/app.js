const http = require('http');
const fs = require('fs');
const config = require('./config/config');
var shell = require('shelljs');

var conn = config.db.get;

conn.query('select * from servers', (err, results, fields) => {
    if (err) throw err;
    
    console.log(results.length);
    for ( var i = 0 ; i < results.length; i++ ) {

        console.log(results[i].serverPath);
        if ( shell.exec(`node ${results[i].serverPath}/server.js`).code !== 0 ) {
            shell.echo('Error : command failed')
            shell.exit(1);
        } 
    }
});