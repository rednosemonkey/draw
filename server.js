var io;
io = require('socket.io').listen(3000);
io.sockets.on('connection', function(socket) {
  socket.on('drawLine', function(data) {
	    socket.broadcast.emit('drawing', data);
  });
});
