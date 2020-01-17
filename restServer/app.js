
const restify = require('restify'),
        config = require('./config'),
        fs = require('fs');   //DB세팅파일

//DB connection 생성
var conn = config.db.get;

const server = restify.createServer(
    {
        name : config.name,
        version : config.version,
        url : config.hostname
    }
);

server.get('/', (req, res) => {
    return fs.readFile('./views/user/userList.html', (err, data) => {
        if ( err ) throw err;
        res.end(data);
    });
});

server.get('/js/*', restify.plugins.serveStatic({
    directory: '/js/',
}))

server.get('/selectUsers', (req, res) => {
    conn.query('select * from user', (err, results, fields) => {
        if (err) throw err;
        res.end(JSON.stringify(results));
    });
});

server.get('/user/:id', (req, res) => {
    conn.query('select * from user where id=?'), [req,params.id],
    (err, results, fields) => {
        if (err) throw err;
        res.end(JSON.stringify(result));
    };
});

server.post('/insertUser', (req, res) => {
    var postData = req.body;
    conn.query('insert into user set ?', postData, (err, results, fields) => {
        if(err) throw err;
        res.end(JSON.stringify(results));
    });
});

server.put('/updateUser', (req, res) => {
    conn.query('update `user` set `name` =? where `id`=?',
    [req.params.id], (err, results, fields) => {
        if (err) throw err;
        res.end('Record has been deleted!');
    });
});

var port = (process.argv[2] == null ? 8080 : parseInt(process.argv[2]));
server.listen(port, () => {
    console.log(`restServer : ${port} 서버 대기 중`);
})