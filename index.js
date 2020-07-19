var http = require('http').createServer();
var io = require('socket.io')(http);
var mysql = require('mysql');

const { PeerServer } = require('peer');
const peerServer = PeerServer({ port: 9000, path: '/projv' });

io.on('connection', (socket) => {

  socket.on('chat message', (msg) => {
    io.emit('chat message', msg);
  });

  socket.on('online', (msg) => {
	var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : 'root',
  database : 'projv',
  port     : '3306',
});
connection.connect();
datn = new Date().toISOString().slice(0, 19).replace('T', ' ');
connection.query("UPDATE users SET online = '" + datn + "' where id = '" + String(msg) + "';");
connection.end();
  });

  socket.on('begin call', (msg) => {
	  console.log("begin call");
    users = JSON.parse(msg);
	io.emit('query call', msg)
  });
  
  socket.on('cancel call', (msg) => {
	io.emit('cancel call', msg)
  });
  
  socket.on('accept call', (msg) => {
	io.emit('accept call', msg)
  });
  
  socket.on('connect call', (msg) => {
	io.emit('connect call', msg)
  });
  
  socket.on('connected', (msg) => {
	io.emit('connected', msg)
  });
});

http.listen(3000, () => {
  console.log('Server started');
});