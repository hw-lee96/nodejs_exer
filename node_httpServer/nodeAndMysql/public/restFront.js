function getUser() {      //로딩 시 가져오는 함수
    // XMLHttpRequest는 HTTP를 통해서 쉽게 데이터를 받을 수 있게 해주는 오브젝트를 제공합니다.
    // Ajax로 실행되는 HTTP 통신도 XMLHttpRequest 규격을 이용하고 있습니다.
    var xhr = new XMLHttpRequest();

    /*
        서버로부터 응답을 받을 때 발생하는 이벤트를 설정
        그래서 GET - users를 요청한 뒤 응답받으면 바로 아래 내용을 실행함
    */
    xhr.onload = function () {
                // xhr.status는 응답에 대한 숫자 HTTP 상태 코드를 반환합니다.
                // 요청이 완료되기 전의 status값은 0이며, 브라우저는 XMLHttpRequest 오류 발생 시 0을 반환합니다.
                /*
                    HTTP 응답 상태 코드는 특정 HTTP 요청이 성공적으로 완료 되었는지를 나타냅니다.
                    응답코드는 5가지 클래스트로 그룹화 됩니다.
                    1. 정보 응답 : 100-199
                    2. 성공적인 응답 : 200-299
                    3. 리디렉션 : 300-399
                    4. 클라이언트 오류 : 400-499
                    5. 서버 오류 : 500-599
                */
        if ( xhr.status === 200 ) {     //200은 요청이 성공했다는 응답코드입니다.
            //responseText는 서버에서 응답 받은 텍스트를 반환합니다.
            var users = JSON.parse(xhr.responseText);

            //restFront.html에서 id가 list인 요소의 element 객체를 반환합니다.
            var list = document.getElementById('list');
            list.innerHTML = '';
            
            /*
                Object.keys()는 key:value 중 key값을 전부 배열로 반환합니다.
                users 객체가 아래와 같은 형태이므로 여기서는 key부분의 13자리 숫자가 배열로 반환된다.
                {1577371078321: "이형우", 1577371102532: "이형우2"} 

                그렇게 생성된 key배열의 원소 key를 매개변수(파라미터)로 아래 동작을 진행한다.

                map : 배열 내 모든 요소에 대해 주어진 함수를 호출한 결과를 모아 새로운 배열을 반환

            */
            //유저 데이터가 없으면 진입하지 않음
            Object.keys(users).map(function (key) {
                //사용할 div, span 생성
                var userDiv = document.createElement('div');
                var span = document.createElement('span');
                //key와 일치하는 value를 span의 텍스트 내용으로 저장
                span.textContent = users[key];
                //사용할 button 생성
                var edit = document.createElement('button');
                //버튼의 text 내용 저장
                edit.textContent = '수정';
                //생성한 버튼에 click 이벤트 설정
                edit.addEventListener('click', function () {
                    var name = prompt("바꿀 이름을 입력하세요.");
                    if ( !name ) {
                        return alert('이름을 반드시 입력하셔야 합니다.');
                    }
                    //변경할 이름을 입력 시 ajax로 아래 동작 실행
                    var xhr = new XMLHttpRequest();
                    xhr.onlond = function () {
                        if ( xhr.status === 200 ) {
                            console.log(xhr.responseText);
                            getUser();
                        } else {
                            console.error(xhr.responseText);
                        }
                    };
                    xhr.open('PUT', '/users/' + key);
                    xhr.setRequestHeader('Content-Type','application/json');
                    xhr.send(JSON.stringify({name:name}));
                });
                var remove = document.createElement('button');
                remove.textContent = '삭제';
                remove.addEventListener('click', function () {      //삭제버튼 클릭
                    var xhr = new XMLHttpRequest();
                    xhr.onload = function () {
                        if ( xhr.status === 200 ) {
                            console.log(xhr.responseText);
                            getUser();
                        } else {
                            console.error(xhr.responseText);
                        }
                    };
                    xhr.open('DELETE', '/users/' + key);
                    xhr.send();
                });
                userDiv.appendChild(span);
                userDiv.appendChild(edit);
                userDiv.appendChild(remove);
                list.appendChild(userDiv);
            });
        } else {
            console.error(xhr.responseText);
        }
    };
    //open : 요청 초기화
    xhr.open('GET','/users');
    //send : 요청을 서버에 전달
    xhr.send("");
}

window.onload = getUser;      //로딩 시 getUser 호출

//id=form인 요소에서 submit 이벤트 발생 시 아래 동작 실행
document.getElementById('form').addEventListener('submit', function (e) {
    e.preventDefault();
    //요청한 요소에서 username의 value값을 name에 저장
    var name = e.target.username.value;
    if ( !name ) {
        return alert('이름을 입력하세요.');
    }
    var xhr = new XMLHttpRequest();
    //서버에 POST로
    xhr.onload = function() {
        
        if ( xhr.status === 201 ) {
            getUser();
        } else {
            console.error(xhr.responseText);
        }
    };
    xhr.open('POST','/users');
    xhr.setRequestHeader('Content-Type','application/json');
    xhr.send(JSON.stringify({name:name}));
    e.target.username.value = '';
});

document.getElementById('dbForm').addEventListener('submit', function (e) {
    e.preventDefault();
    //요청한 요소에서 username의 value값을 name에 저장
    var name = e.target.username.value;
    if ( !name ) {
        return alert('이름을 입력하세요.');
    }
    var xhr = new XMLHttpRequest();

    //서버에 POST로
    xhr.onload = function() {
        if ( xhr.status === 201 ) {
            console.log("xhr.responseText : " + xhr.responseText);
            getUser();
        } else {
            console.error(xhr.responseText);
        }
    };

    xhr.open('POST','/usersDB');
    xhr.setRequestHeader('Content-Type','application/json');
    xhr.send(JSON.stringify({name:name}));
    e.target.username.value = '';
});