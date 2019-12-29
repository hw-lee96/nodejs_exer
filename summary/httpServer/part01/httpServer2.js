/*
    fs(file system) : 파일 시스템과 상호작용 하기위한 API를 제공합니다.
    참고(node 공식 문서) : https://nodejs.org/api/fs.html#fs_file_system

    아래 예시에서는 server1 예시에서 문자열을 보내준 것과 다르게
    fs 모듈을 이용해 HTML 파일을 읽고 data 변수에 저장하며, 이렇게 저장된 버퍼를 클라이언트에 보내주면 됩니다.
 */
const http = require('http');
const fs = require('fs');

http.createServer((req, res) =>  {
    fs.readFile('./httpServer2.html', (err, data) => {
        if ( err) {
            throw err;
        }

        res.end(data);
    });
}).listen(8081, () => {
    console.log('server2 : 8081번 포트에서 서버 대기 중입니다.');
});