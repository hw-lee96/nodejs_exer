const config = require('./config'),
    restify = require('restify'),
    mysql = require('mysql');

var conn = config.db.get;

server.use(restify.plugins.acceptParser(server.acceptable));
server.use(restify.plugins.queryParser());
server.use(restify.plugins.bodyParser());
