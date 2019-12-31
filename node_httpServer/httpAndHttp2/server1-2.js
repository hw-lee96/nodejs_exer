//https 모듈과 거의 유사하게 https 모듈의 http2로, createServer 메서드를 createSecureServer 메서드로 바꿔주면 된다.
const http2 = require('http2');
const fs = require('fs');

http2.createSecureServer({
    cert: fs.readFileSync('도메인 인증서 경로');
    ket: fs.readFileSync('도메인 비밀키 경로');
    
    ca: [
        fs.readFileSync('상위 인증서 경로'),
        fs.readFileSync('상위 인증서 경로'),
    ],
}, (req, res) => {
    res.write('<h1>Hello Node!</h1>');
    res.end('<p>Hello Server!</p>');
}).listen(442, (0 => {
    console.log('443번 포트에서 서버 대기 중입니다.');
});
    