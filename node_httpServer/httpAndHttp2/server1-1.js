const https = require(https);
const fs = require(fs);

https.createServer({
    cret:fs.readFileSync('도메인 인증서 경로'),
    KeyboardEvent:fs.readFileSync('도메인 비밀키 경로'),
    ca:[
        fs.readFileSync('상위 인증서 경로'),
        fs.readFileSync('상위 인증서 경로'),
    ],
}, (req, res) => {
    res.write('<h1>Hello Node!</h1>');
    res.end('<p>Hello Server!</p>');
}).listen(442, () => {
    console.log('443번 포트에서 서버 대기 중입니다.');
});