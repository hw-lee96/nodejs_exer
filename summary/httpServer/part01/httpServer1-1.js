/*
    1. 콜백 함수를 이용
    createServer 메서드 뒤에 listen 메서드를 붙이고 클라이언트에게 공개 할 포트 번호와
    포트 연결 완료 후 실행될 콜백함수를 넣어줍니다.
*/

// 필요한 모듈을 이용해 로드합니다.
const http = require('http');

// 요청(req)과 응답(res)에 관한 정보를 담아 서버를 생성합니다.
http.createServer((req, res) => {
    // 인자로 요청에 대한 콜백 함수를 넣을 수 있으며, 요청이 들어올 때마다 매번 콜백 함수가 실행된다.
    // 따라서 이 콜백 함수에 응답을 적어주면 된다.
    res.write('<h1>Hello Node!</h1>');
    res.end('<p>Hello Server!</p>');
}).listen(8080, () => {     //8080포트로 요청이 들어오게 되면 아래 동작을 하게 됩니다.
    console.log('httpServer1 : 8080포트 대기 중');
});
