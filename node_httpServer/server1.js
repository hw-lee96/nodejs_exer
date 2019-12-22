// 응답을 보내는 부분과 서버 연결 부분 추가

/*
    res.write : 클라이언트로 보낼 데이터로 다음과 같은 동작이 가능합니다.
     - HTML 형식의 문자열 전송
     - 버퍼 전송
     - 여러 번 호출하여 데이터를 여러 개 전송

    res.end : 응답을 종료하는 메서드로 만약 인자가 있다면 그 데이터도 클라이언트로 보내고 응답을 종료합니다.

    아래 예시에서는 res.write에서 한 번, res.end에서 한 번 문자열을 클라이언트로 보낸 후 응답을 종료하며,
    브라우저에서는 응답 내용을 받아서 렌더링 합니다.
*/


/*
    1. 콜백 함수를 이용
    createServer 메서드 뒤에 listen 메서드를 붙이고 클라이언트에게 공개 할 포트 번호와
    포트 연결 완료 후 실행될 콜백함수를 넣어줍니다.
*/
const http = require('http');

http.createServer((req,  res) => {
    res.write('<h1>Hello Node!</h1>');
    res.end('<p>Hello Server!</p>');
}).listen(8080, () => {
    console.log('callback : 8080번 포트에서 서버 대기 중입니다.');
});


/*
    2. 이벤트 리스너 이용
    동일한 내용이지만 listen 메서드에 콜백 함수를 넣는 대신
    서버에 listening 이벤트 리스너와 error 이벤트 리스너를 붙인 버전입니다.
*/
/*

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

*/