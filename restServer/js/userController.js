function getUser() {
    var xhr = new XMLHttpRequest();

    xhr.onload = function () {
        if ( xhr.status === 200 ) {

            var users = xhr.responseText;

            console.log(users);

        }
    }

    xhr.open('GET', '/selectUsers');
    xhr.send("");
}

window.onload = getUser;