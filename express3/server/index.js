var createError = require('http-errors');
var express = require('express');
var path = require('path');
var app = express();
var {renderLayout} = require('../templates/index.js');

app.use('/public', express.static(path.resolve(__dirname, '../public')));

app.get('*', function(req, res) {
  res.send(renderLayout());
});

app.listen(3000);

// errors
app.use(function(err, req, res, next) {
  console.error(err.stack);
  res.status(404).send('not found');
  res.status(500).send('Something broke!');  
});

