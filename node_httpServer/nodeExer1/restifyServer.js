//Restify 모듈 사용

/*
    Restify 모듈은 RESTful Web Service를 제공하기 위해 특화된 모듈이다.
    Express의 아키텍처 중 REST에 특화된 기능만을 제공하기 때문에 상당히 경량화 되어있다.
*/

const restify = require('restify');

var resp = (req, res, next) => {
    var result = {message : `Hello! ${req.params.name}!`};
    res.send(result);
};

var server = restify.createServer();

server.use(restify.plugins.bodyParser());

server.get('/hello/:name', resp);
server.head('/hello/:name', resp);

server.post('/notifitcation', (req, res, next) => {
    var noti = JSON.parse(req.body);
    console.log('notification : ' + JSON.stringify(noti));
    console.log('message : ' + noti.message);
    resp(req, res, next);
});

server.listen(8080, () => {
    console.log('%s listening at %s', server.url);
});