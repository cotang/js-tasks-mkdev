var createError = require('http-errors');
var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var app = express();
var {renderLayout} = require('../templates/index.js');
// var todolist = [{key: 1533129828864, title: 'Test', completed: false}];
var todolist = [];

app.use(bodyParser.json())

app.use('/public', express.static(path.resolve(__dirname, '../public')));


app.post('/api/todos', 
  (req, res, next) => {
    if (req.body.title != ''){
      next();
    } else {
      res.status(404).send('Validation error'); 
    }
  },
  (req, res, next) => {
    const todoitem = {
      key: Date.now(),
      title: req.body.title,
      completed: false
    }
    todolist.push(todoitem);
    res.json(todolist);
  }
);

app.put('/api/todos/:todoID', function(req, res) {
  const requestID = req.params.todoID.slice(1);
  todolist.forEach(item => {
    if (item.key == requestID){
      item.completed = !item.completed;
    }
  })
  res.json(todolist);
});

app.delete('/api/todos/:todoID', function(req, res) {
  const requestID = req.params.todoID.slice(1);
  // console.log(req.body, req.params.todoID, requestID)
  let thisToDo = todolist.filter(item => {
    return item.key == requestID
  })[0];
  const index = todolist.indexOf(thisToDo); 
  todolist.splice(index, 1);
  res.json(todolist);
});

app.get('/api/todos', function(req, res) {
  res.json(todolist);
});

app.get('*', function(req, res) {
  res.status(200).send(renderLayout());
});


// errors
app.use(function(req, res, next) {
  res.status(404).send('not found'); 
});
app.use(function(err, req, res, next) {
  console.error(err.stack);
  res.status(500).send('Something broke!');  
});

app.listen(3000);





