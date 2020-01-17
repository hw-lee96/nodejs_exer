const http = require('http');
const fs = require('fs');

http.createServer( (req, res) => {
    return fs.readFile('../views/index.html', (err, data) => {
        if (err) throw err;
        res.end(data);
    })
}).listen(8001, () => {
    console.log('8001 : index server start');
});