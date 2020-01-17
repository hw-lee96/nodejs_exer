const mysql = require('mysql');

//DB 접속 정보 저장
module.exports = {
    db : {
        get : mysql.createPool({
            user:'root',
            password:'asdf112!',
            database:'study_db'
        })
    }
}