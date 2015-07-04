var express = require('express');
var app = express();

var bodyParser = require('body-parser');
var multer = require('multer'); 

var orders = [];

app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
app.use(multer()); // for parsing multipart/form-data

app.get('/', function (req, res) {
  res.sendFile(__dirname + '/index.html');
});

app.post('/', function (req, res) {
  orders.push(req.body);
  console.log('================== outstanding orders  =========================');
  console.log(orders);
  res.redirect('/');
});

var server = app.listen(3000, function () {
  var host = server.address().address;
  var port = server.address().port;
  console.log('Sample app listening at http://%s:%s', host, port);
});
