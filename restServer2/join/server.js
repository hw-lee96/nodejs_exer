const http = require('http');
const fs = require('fs');

http.createServer( (req, res) => {
    return fs.readFile('../views/join.html', (err, data) => {
        if (err) throw err;
        res.end(data);
    })
}).listen(8002, () => {
    console.log('8002 : join server start');
});