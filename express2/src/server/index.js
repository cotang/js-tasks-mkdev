var createError = require('http-errors');
var express = require('express');
var app = express();

app.use(express.static(__dirname +'./../../'));
app.listen(3000);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404, 'Error 404 - this page was not found'));
});



