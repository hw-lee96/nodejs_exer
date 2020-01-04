# node서버에 mysql연결하기
node에서 mysql에 접속은 Sequelize(시퀄라이즈) 모듈을 이용해 진행합니다.

## Sequelize(시퀄라이즈)란?
ORM(Object-relational Mapping)으로 분류됩니다.
ORM은 자바스크립트 객체와 데이터베이스의 릴레이션을 매핑해주는 도구입니다. (뭔솔)

시퀄라이즈는 자바스크립트 구문을 자동으로 SQL로 바꿔는 장점이 있다. 그렇기 때문에 SQL을 몰라도 mysql을 어느 정도 다룰 수 있게 된다.