// 클러스터링 진행

//필요한 모듈 로드
const cluster = require('cluster');
const http = require('http');
//os 모듈 - 운영체제와 시스템의 정보를 가져올 수 있는 모듈
const numCPUs = require('os').cpus().length;

if ( cluster.isMaster ) {
    console.log(`마스터 프로세스 아이디 : ${process.pid}`);

    //CPU 개수만큼 워커를 생산
    for ( let i = 0 ; i < numCPUs; i += 1 ) {
        cluster.fork();
    }

    //워커가 종료되었을 때
    cluster.on('exit', (worker, code, signal) => {
        console.log(`${worker.process.pid}번 워커가 종료되었습니다.`);
        //서버가 종료되었을 때 새로운 워커를 하나 생성하게 함
        cluster.fork();
    });
} else {
    //워커들이 포트에서 대기하다가 요청이 들어오면 워커 프로세스에 요청을 분배
    http.createServer((req, res) => {
        res.write('<h1>Hello Node!</h1>');
        res.end(`<p>Hello Cluster<br>${process.pid} worker start! </p>`);
        //요청이 들어올 때마다 1초 후 서버가 종료되도록 설정 -> 워커의 생성 여부를 확인하기 위함
        setTimeout( () => {
            process.exit(1);
        }, 1000);
    }).listen(8085);

    console.log(`${process.pid}번 워커 실행`);
}


/*
    [실행 결과]
    
    실행한 노트북이 4코어여서 워커가 4개 생성됨
    > 서버를 호출할 때 마다 워커를 워커를 종료하며, 생성한 4개가 전부 종료되면 서버가 응답하지 않게 됨
    (즉, 4번까지는 오류가 발생해도서버가 정상 작동할 수 있다는 뜻)

    > 종료된 워커를 다시 켜면 오류가 발생해도 서버가 죽지 않고 버틸 수 있다.

    근본적인 해결방법은 아니며, 오류 자체의 원인을 찾아 해결해야 한다.
    하지만, 예기치 못한 에러로 인해 서버가 종료되는 현상을 방지할 수 있어 클러스터링을 적용해두는 것이 좋다.

    cluster 모듈로 클러스터링을 구현할 수 있지만, 실무에서는 pm2 등의 모듈로 클러스터링을 한다.
*/