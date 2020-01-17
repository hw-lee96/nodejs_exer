const http = require('http');
const config = require('../config/config');
const qs = require('querystring');

var conn = config.db.get;

http.createServer( (req, res) => {

    if (req.method == 'POST') {
        var body = '';

        req.on('data', function (data) {
            body += data;

            // Too much POST data, kill the connection!
            // 1e6 === 1 * Math.pow(10, 6) === 1 * 1000000 ~~~ 1MB
            if (body.length > 1e6)
                request.connection.destroy();
        });

        req.on('end', function () {
            var post = qs.parse(body);
            console.log(post);

            var userData = [[post.userID, post.userPW]];
            console.log(userData);

            conn.query('insert into user(userID, userPW) values(?)', userData, (err, results, fields) => {
                if(err) throw err;

                console.log(results);

                res.writeHead(301,
                    {Location: 'http://localhost:8001'}
                );
                res.end();
            });

        });
    }

}).listen(8004, () => {
    console.log('8004 : insertUser server start');
});