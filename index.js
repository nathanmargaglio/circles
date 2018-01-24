var express = require('express');
var app = express();
var path = require("path");
var server = require('http').Server(app);
var io = require('socket.io')(server);

server.listen(3001);

app.use(express.static('src'));

app.get('/', function(req, res){
    res.sendFile(path.join(__dirname+'/src/index.html'));
});

io.on('connection', function (socket) {
    socket.emit('news', { hello: 'world' });
    socket.on('my other event', function (data) {
        console.log(data);
    });
});

app.listen(3000);