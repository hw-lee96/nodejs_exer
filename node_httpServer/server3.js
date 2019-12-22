/*
    서버는 요청에 대한 응답을 할 때 쿠키라는 것을 같이 보내줍니다.
    쿠키는 name=hwlee와 같이 단순한 '키-값'의 쌍으로, 브라우저는 서버로부터 전달받은 쿠키를 저장해두었다가
    해당 서버로 요청할 때마다 쿠키를 동봉해서 보내줍니다.
    
    헤더는 요청 또는 응답에 대한 정보를 가지고 있는 곳이고,
    본문은 서버와 클라이언트 간에 주고받을 실제 데이터를 담아두는 공간입니다. 
    쿠키는 부가적인 정보이므로 헤더에 저장합니다.

    저장된 쿠키는 크롬 개발자 도구의 Network 탭에서 확인할 수 있습니다.

    아래 예시에서는 서버에서 직접 쿠키를 만들어 요청자에게 전달하는 동작을 합니다.
*/

const http = require('http');

/*  
    parseCookies
    : 쿠키에서 전달되는 name=hwlee;year=2019처럼 전달되는 문자열 형식을
    {name:'hwlee',year:'2019'}와 같이 객체로 바꾸는 함수입니다.
*/
const parseCookies = (cookie = '') =>
    cookie
    .split(';')
    .map(v => v.split('='))
    .map(([k,...vs]) => [k, vs.join('=')])
    .reduce((acc, [k, v]) => {
        acc[k.trim()] = decodeURIComponent(v);
        return acc;
    },{});

http.createServer((req, res) => {
    //req 객체에 담겨있는 쿠키를 분석
    const cookies = parseCookies(req.headers.cookie);
    console.log(req.url, cookies);
    /*
        응답 헤더에 쿠키를 기록해야 하므로 res.writeHead 메서드를 이용하며
        첫 번째 인자로 200이라는 상태 코드를 넣어 성공이라는 의미로 사용합니다.
        Set-Cookie는 브라우저한테 다음과 같은 값의 쿠키를 저장하라는 의미입니다.
    */
    res.writeHead(200, {'Set-Cookie':'mycookie=test'});
    res.end('Hello Cookie');
})
.listen(8082, () => {
    console.log('server3 : 8082번 포트에서 대기 중입니다.');
});