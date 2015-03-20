var express = require('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);

var port = process.env.PORT || 3000;

app.get('/', function (req, res) {
	res.send("");
});

io.on('connection', function (socket) {
	console.log("1 Yeni bağlantı.");
	
	socket.on('MesajGonder', function (data) {
		socket.broadcast.emit('YeniMesajDinle',{'username':data.username,'message':data.message});
		console.log(data.username +":"+data.message);
	});
		
	socket.on('disconnect', function(){
		console.log('1 Bağlantı sonlandı.');
	});

});

server.listen(port);

console.log('Uygulama ' + port + ' üzerinden ayakta');  
