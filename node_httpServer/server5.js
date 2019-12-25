/*
    server4.js와 동일한 코드에 서버가 사용자 정보를 관리하도록 만드는 소스 추가

    실제 배포용 서버에서는 세션을 아래와 같이 변수에 저장하지 않습니다.
    서버가 멈추거나 재시작되면 메모리에 저장된 변수가 초기화되기 떄문입니다.
    또한, 서버의 메모리가 부족하면 세션을 저장하지 못하는 문제도 생깁니다.
    그래서 보통은 DB에 저장합니다.
*/

const http = require('http');
const fs = require('fs');
const url = require('url');
const qs = require('querystring');

const parseCookies = (cookie ='') => 
    cookie
        .split(';')     
        .map(v=>v.split('=')) 
        .map( ([k,...vs] ) => [k, vs.join('=')])    
        .reduce((acc, [k,v]) => {                  
            acc[k.trim()] = decodeURIComponent(v);
            return acc;
        }, {});

const session = {};

http.createServer((req, res) => {
    const cookies = parseCookies(req.headers.cookie);

    if ( req.url.startsWith('/login') ) {       
        const { query } = url.parse(req.url);   
        const { name } = qs.parse(query);
        const expires = new Date();             
        expires.setMinutes(expires.getMinutes() + 1);

        const randomInt = +new Date();

        // 사용자의 이름과 만료 기한은 session이라는 객체에 저장합니다.
        session[ramdomInt] = {
            name,
            expires,
        };

        res.writeHead(302, {
            Location:'/',   
            'Set-Cookie' : `session=${randomInt};Expires=${expires.toGMTString()}; HttpOnly; Path=/`,
        });
        res.end();
    // 쿠키에 세션이 있고, 만료 기한을 넘기지 않았다면 session에서 사용자 정보를 가져와서 사용합니다.
    } else if ( cookies.session && session[cookies.session].expires > new Date() ) {
        res.writeHead(200, {'Content-Type':'text/html; charset=utf-8'});        
        res.end(`${session[cookies.session].name}님 안녕하세요!`);
    } else {
        fs.readFile('./server4.html', (err, data) => {
            if ( err ) {
                throw err;
            }
            res.end(data);
        });
    }
})
.listen(8084, () => {
    console.log('server5 : 8084번 포트에서 서버 대기중입니다.');
});