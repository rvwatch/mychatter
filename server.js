var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.get('/', function(req, res){
  res.sendFile(__dirname + '/public/index.html');
});

 
io.on('connection', function(socket){
  socket.on('disconnect', function(msg){
    console.log('user disconnected');
    io.emit('disconnect', 'User Disconnected!');
  });
  socket.on('chat message', function(msg){
    socket.broadcast.emit('chat message', msg); 
  });
  socket.on('typing', function(alert){
    socket.broadcast.emit('typing', alert); 
  });
  socket.on('user', function(user){
    socket.broadcast.emit('user', `${user} is connected`); 
  });
});


http.listen(3000, function(){
  console.log('listening on *:3000');
});