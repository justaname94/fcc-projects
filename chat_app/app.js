var express = require('express');
var app = express();

var server = require('http').Server(app);
var io = require('socket.io').listen(server);

app.use(express.static(__dirname + '/public'));

var connectedUsers = [];
var messages = [];

io.on('connection', function (socket) {

    socket.on('username', function(name) {
      if(name) {
        connectedUsers.push(name);
      }

      io.emit('username', name);

      socket.on('disconnect', function() {
        var index = connectedUsers.indexOf(name);
        connectedUsers.splice(index, 1);
        console.log('client ' + name +  ' disconnected!');
        io.emit('user_disconnect', name);
      });
    });

    io.emit('init', { 'online': connectedUsers,
                        'msgs': messages });

    socket.on('chat message', function(msg) {
      messages.push(msg);
      io.emit('chat message', msg);
    });
});

server.listen(8080);
console.log('Server listening in port 8080');