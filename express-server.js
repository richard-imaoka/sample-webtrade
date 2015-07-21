var express = require('express');
var bodyParser = require('body-parser');
var multer = require('multer');

var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);

var orders = [];

app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
app.use(multer()); // for parsing multipart/form-data

server.listen(3010);

app.get('/', function (req, res) {
  res.sendFile(__dirname + '/index.html');
});

app.post('/', function (req, res) {
  orders.push(req.body);
  console.log('================== outstanding orders  =========================');
  console.log(orders);
  res.redirect('/');
});

app.get('/bundle.js', function (req, res) {
  res.sendFile(__dirname + '/bundle.js');
});

io.on('connection', function (socket) {
  console.log('connected');
  socket.emit('news', { hello: 'world' });
  socket.on('my other event', function (data) {
    console.glog(data);
  });
});