var createError = require('http-errors');
var express = require('express');
var path = require('path');
var app = express();


app.use(express.static(__dirname +'./../'));
// app.use("/public", express.static(path.resolve(__dirname, '../public')));

app.get('/', function(req, res) {
	res.sendFile(__dirname+'/index.html');
});

app.listen(3000);

// errors
app.use(function(err, req, res, next) {
  console.error(err.stack);
  // res.status(500).send('Something broke!');
  res.status(404).send('not found');
});

