서버 구동(8086) 
> localhost:8086 요청 
> restServer.js에서 다음 동작 실행
 >> 첫 if문에서 GET으로 빠짐
  >> 다음 if문에서 /로 빠짐(url을 아무것도 입력하지 않았을 때)
   >> restFront.html파일을 로드
    >> 에러 없을 시 로드한 파일 버퍼에 담아 response

> 클라이언트는 restFront.html을 response받음
 >> restFront.html에서 restFront.js include
  >> restFront.js에서 onload했을 때 파일 내에 있는 getUser()함수 실행
   >> getUser() 함수의 첫 if문에서 xhr.status가 200으로 err로 가지 않고 진행
    >> restServer.js에서 응답받은 json이 없으므로 하위 내용은 실행하지 않음
     >> GET, /users로 다시 요청을 보냄

> 보낸 GET, /users 요청은 restServer.js에서 받고 다음 동작 실행
 >> if문을 GET, /users로 따라가 다음 동작 실행
  >> restServer.js내의 users를 json형태로 변환하여 응답 내용에 담아 응답.

> restFront.js에서 xhr.onload 이벤트 발생
 >> xhr.status === 200으로 들어감
  >> users데이터 없어서 별도의 동작 없이 onload에 기재된 이벤트 내용만큼만 실행
