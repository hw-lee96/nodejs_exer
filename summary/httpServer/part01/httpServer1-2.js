/*
    2. 이벤트 리스너 이용
    동일한 내용이지만 listen 메서드에 콜백 함수를 넣는 대신
    서버에 listening 이벤트 리스너와 error 이벤트 리스너를 붙인 버전입니다.
*/

const http = require('http');

const server = http.createServer((req, res) => {
    res.write('<h1>Hello Node!</h1>');
    res.end('<p>Hello Server!</p>');
});

server.listen(8080);
server.on('listening', () => {
    console.log('listening : 8080번 포트에서 서버 대기 중입니다.');
});

server.on('error', (error) => {
    console.error(error);
});