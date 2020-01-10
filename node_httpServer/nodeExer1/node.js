/*
    Initialize Server
*/

const server = restify.createServer({
    name : config.name,
    version : config.version,
    url : config.hostname
});

server.get('/employees', (req, res) => {
    conn.query('select * from users', (err, results, fields) => {
        if (err) throw err;
        res.end(JSON.stringify(results));
    });
});

server.get('/employee/:id'), (req, res) => {
    conn.query('select * from users where id=?'), [req,params.id],
    (err, results, fields) => {
        if (err) throw err;
        res.end(JSON.stringify(result));
    };
};

server.post('employees', (req, res) => {
    var postData = req.body;
    conn.query('insert into users set ?', postData, (err, results, fields) => {
        if(err) throw err;
        res.end(JSON.stringify(results));
    });
});

server.put('/employss', (req, res) => {
    conn.query('update `users` set `name` =? where `id`=?',
    [req.params.id], (err, results, fields) => {
        if (err) throw err;
        res.end('Record has been deleted!');
    });
});

server.listen(3001, () => {
    console.log('%s listening at %s', server.name, server.url);
});
