const http = require('http');
const fs = require('fs');
const url = require('url');
const qs = require('querystring');

const parseCookies = (cookie ='') => 
    cookie
                        // 시작 값 : 'name=hwlee;age=24;'
        .split(';')     // 세미콜론(;)을 구분자로 하여 전달받은 값을 배열로 분리 : ['name=hwlee', 'age=24']
        .map(v=>v.split('='))   // 이퀄(=)을 구분자로 분리 : [ ['name', 'hwlee'], ['age', '24'] ]
                                // .map 함수 : 배열의 각 원소에 대해 지정한 동작을 실행 후 배열로 다시 반환한다.
                                // 여기서는 각 원소를 이퀄(=)로 스플릿하여 배열로 만든 뒤 다시 반환하게 된다.
        .map( ([k,...vs] ) => [k, vs.join('=')])    //key와 values로 구분한다. 배열의 첫 번째 인덱스를 key로 잡고 
                                                    // ...vs로 하여 나머지를 values로 잡는다.
                                                    //그 다음 vs(value값으로 이루어진 배열)에 값을 join함수로 묶는다.
                                                    //array.join('=')는 배열의 값을 이퀄(=)로 하나의 문자열로 합치는 역할을 한다.
                                                    // ex) ['abc', 'def'].join('=') == 'abc=def'
                                                    //이 동작을 하는 이유는 맨 앞의 key를 구분하기 위해 이퀄(=)을 구분자로
                                                    //스플릿 할 때 value의 이퀄(=)역시 split되어 버렸기 때문에 다시 합쳐주는 것이다.

        .reduce((acc, [k,v]) => {                   //reduce는 배열의 원소를 대상으로 실행되며 다음과 같이 사용할 수 있다.
                                                    //배열.reduce( (누적값, 현재값, 인덱스, 요소) => {return 결과}, 초기값);
                                                    //따라서 현재 예시에서는 현재값을 나타내는 [k,v] 배열을 대상으로 k값을 공백 제거(trim),
                                                    //decodeURIComponent를 통해 암호화된 URL을 복호화 한 뒤 acc에 key=value 형태로 저장을 한 뒤
                                                    // acc를 결과값으로 return 하여 누적값에 누적시킨다.
            acc[k.trim()] = decodeURIComponent(v);
            return acc;
        }, {});                                     //최종적으로 'name=hwlee;age=24'로 전달된 값을 {name:'hwlee', age:'24'} 형태로 변환하여 return하게 된다.

http.createServer((req, res) => {
    const cookies = parseCookies(req.headers.cookie);
    if ( req.url.startsWith('/login') ) {
        const { query } = url.parse(req.url);
        const { name } = qs.parse(query);
        const expires = new Date();
        expires.setMinutes(expires.getMinutes() +5);
        res.writeHead(302, {
            Location:'/',
            'Set-Cookie' : `name=${encodeURIComponent(name)};
            Expires=${expires.toGMTString()}; HttpOnly; Path=/`,
        });
        res.end();
    } else if ( cookies.name ) {
        res.writeHead(200, {'Content-Type':'text/html; charset=urf-8'});
        res.end(`${cookies.name}님 안녕하세요`);
    } else {
        fs.readFile('./server4.html', (err, data) => {
            if ( err ) {
                throw err;
            }
            res.end(data);
        });
    }
})
.listen(8083, () => {
    console.log('server4 : 8083번 포트에서 서버 대기중입니다.');
});