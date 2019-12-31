const http = require('http');

http.createServer((req, res) => {
    res.write('<h1>Hello Node</h1>');
    res.end(<p>Hello Server!</p>);
}).listen(8080, () => {
    console.log('8080번 포트에서 서버 대기 중입니다.');
});

/* 
    https는 암호화를 적용하는 만큼, 그것을 인증해줄 수 있는 기관도 필요
    server1-1.js와 같이 하면 됨
*/