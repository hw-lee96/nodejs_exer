const http = require('http');
const config = require('../config/config');
const qs = require('querystring');

var conn = config.db.get;

http.createServer( (req, res) => {

    if (req.method == 'POST') {
        var body = '';

        req.on('data', function (data) {
            body += data;
            if (body.length > 1e6)
                request.connection.destroy();
        });

        req.on('end', function () {
            var post = qs.parse(body);

            conn.query(`select count(*) as cnt from user where userId = '${post.userID}' and userPW = '${post.userPW}'`, (err, results, fields) => {
                if(err) throw err;

                if ( results[0].cnt === 1 ) {
                    console.log('로그인 성공');
                } else {
                    console.log('로그인 실패 : 유저 정보 없음');
                }

                res.writeHead(301,
                    {Location: 'http://localhost:8001'}
                );
                res.end();
            });

        });
    }

}).listen(8003, () => {
    console.log('8003 : login server start');
});