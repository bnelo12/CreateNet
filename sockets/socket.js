var socket_io = require('socket.io');
var io = socket_io();
var socketApi = {};

var socket = io;

io.on('connection', function(socket){
  console.log('A user connected');
});

socketApi.sendNotification = function() {
  socket.sockets.emit('hello', {msg: 'Hello World!'});
}

module.exports = socket;
