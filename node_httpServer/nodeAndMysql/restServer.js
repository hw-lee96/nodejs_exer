const http = require('http');
const fs = require('fs');
const users = {};
const mysql = require('mysql');

const con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "asdf112!",
    database: "nodejs"
});

http.createServer( (req, res) => {
    if ( req.method === 'GET' ) {
        if ( req.url === '/' ) {
            return fs.readFile('./views/restFront.html', (err, data) => {
                if ( err ) {
                    throw err;   
                }
                res.end(data);  
            });
        } else if ( req.url === '/about' ) {
            return fs.readFile('./views/about.html', (err, data) => {
                if ( err ) {
                    throw err;
                }
                res.end(data);
            });
        } else if ( req.url === '/users' ) {
            //DB 조회
            selectUser();

            //JavaScript 값이나 객체를 JSON 문자열로 변환
            return res.end(JSON.stringify(users));

            //DB에서 조회한 내용을 반환
            // return res.end(JSON.stringify( selectUser() ));
        }
        return fs.readFile(`.${req.url}`, (err, data) => {
            if ( err ) {
                res.writeHead(404, 'NOT FOUND');
                return res.end('NOT FOUND');
            }
            return res.end(data);
        });
    } else if ( req.method === 'POST' ) {
        if ( req.url === '/users') {
            let body = '';
            //on('click') 처럼 data에 대응하는 이벤트 작성
            req.on('data', (data) => {
                body += data;
            });
            //end에 대응하는 이벤트 작성
            return req.on('end', () => {
                console.log('POST 본문(Body) : ', body);
                const {name} = JSON.parse(body);
                //날짜를 숫자로 반환
                const id = +new Date();
                //id(key) : name(value)로 저장
                users[id] = name;
                res.writeHead(201);
                res.end('등록 성공');
            });
        } else if ( req.url === '/usersDB' ) {
            //DB에 insert

        }
    } else if ( req.method === 'PUT' ) {
        if( req.url.startsWith('/users/') ) {
            const key = req.url.split('/')[2];
            let body = '';
            req.on('data', (data) => {
                body += data;
            });
            return req.on('end', () => {
                console.log('PUT 본문(body) : ', body);
                users[key] = JSON.parse(body).name;
                return res.end(JSON.stringify(users));
            });
        }
    } else if ( req.method === 'DELETE' ) {
        if ( req.url.startsWith('/users/') ) {
            const key = req.url.split('/')[2];
            delete users[key];
            return res.end(JSON.stringify(users));
        }
    }
    res.writeHead(404, 'NOT FOUND');
    return res.end('NOT FOUND');
})
.listen(8086, () => {
    console.log('REST SERVER : 8086번 포트에서 서버 대기 중입니다.');
});


//유저 전체 조회
function selectUser() {
    con.connect(function(err) {
        if (err) throw err;
        con.query("SELECT * FROM users", function (err, result, fields) {
            if (err) throw err;

            for ( var i = 0 ; i < result.length ; i++ ) {
                console.log( result[i].id + ", " + result[i].name + ", " + result[i].age );
            }

            return result;
        });
    });
}