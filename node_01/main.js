//https://opentutorials.org/course/3332/21032

//node.js는 웹서버 기능이 내장 되어 있기 때문에 아파치와 똑같이 웹서버로 사용할 수 있다.

var http = require("http");
var fs = require("fs");

// 서버를 생성
// var app = http.createServer( function(req, res) {
var app = http.createServer((req, res) => {
  var url = req.url;
  //요청 url이 없을 때 index.html로 이동

  url = url == "/" ? "/index.html" : url;

  if (req.url == "/favicon.ico") {
    return res.writeHead(404);
  }

  res.writeHead(200);
  //__dirname : main.js가 위치하고 있는 디렉토리
  console.log(__dirname + url);

  //유저에게 전달 할 페이지를 읽어옴
  //유저에게 전송 할 데이터를 생성하는 것이 장점 중 하나
  res.end(fs.readFileSync(__dirname + url));
});

//express 사용
// var express = require("express");
// var app = express();
// var bodyParser = require("body-parser");

//bodyParser 사용
// app.use(bodyParser.urlencoded({ extended: true }));

//mysql 모듈 불러오기
var mysql = require("mysql");

//mysql 커넥션 생성
var conn = mysql.createConnection({
  host: "localhost", //서버 로컬 IP
  port: 3306,
  user: "root", //계정 아이디
  password: "asdf112!", //계정 비밀번호
  database: "study_db" //접속할 DB
});

//mysql 접속
conn.connect();

function logsend(res, str) {
  console.log(str);
  res.send(str);
}

//id select
function selectUser(userID, req, res) {
  conn.query(
    `select count(*) as cnt from user where userID = '${userID}'`,
    (error, result, fileds) => {
      if (error) {
        logsend(res, "err : " + error);
      } else {
        if (result[0].cnt > 0) {
          logsend(res, "이미 가입된 아이디 입니다.");
          return false;
        } else {
          insertUser(userID, userPW, req, res);
        }
      }
    }
  );
}

//id insert
function insertUser(userID, userPW, req, res) {
  conn.query(
    `insert into user (userID, userPW) values ('${userID}','${userPW}')`,
    (error, result, fileds) => {
      if (error) {
        //에러 발생 시
        logsend(res, "err : " + error);
      } else {
        //성공 시
        console.log;
        res.send("success create user name : " + userID + ", pw : " + userPW);
      }
    }
  );
}

//user 라우터 - express
// app.get("/user", (req, res) => {
//   //post
//   //   var userID = req.body.id;
//   //   var userPW = req.body.pw;

//   //get
//   var userID = req.query.id;
// 	var userPW = req.query.pw;

// 	console.log(userID);
// 	console.log(userPW);

//   if (userID && userPW) {
//     //userID와 userPW가 유효할 때 실행
//     //id 조회
//     conn.query(
//       `select count(*) as cnt from user where userID = '${userID}'`,
//       (error, result, fileds) => {
//         if (error) {
//           logsend(res,"err : " + error);
//         } else {
// 					if ( result[0].cnt > 0 ) {
// 						logsend(res,'이미 가입된 아이디 입니다.');
// 						return false;
// 					} else {
// 						insertUser(userID, userPW, req, res);
// 					}
//         }
//       }
//     );

//   }
// });

app.listen(3000, () => {
  console.log("server starting with 3000");
});
