var createError = require('http-errors');
var express = require('express');
var path = require('path');
var fs = require('fs');
var bodyParser = require('body-parser');
var app = express();
var {renderLayout} = require('../templates/index.js');
// var todolist = [{key: 1533129828864, title: 'Test', completed: false}];
// var todolist = [];

const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');
// Connection URL
const url = 'mongodb://localhost:27017/todos';
// Database Name
const dbName = 'todos';



const findTodos = function(db, res, callback) {
  // Get the todos collection
  const collection = db.collection('todos');
  // Find some todos
  collection.find({}).toArray(function(err, list) {
    assert.equal(err, null);
    console.log("Found the following records");
    callback(list);
    console.log(list);
    res.json(list);
  });
}

const insertTodo = function(db, newElem, callback) {
  // Get the todos collection
  const collection = db.collection('todos');
  // Insert some todo
  collection.insertOne(newElem, function(err, result) {
    assert.equal(err, null);
    assert.equal(1, result.result.n);
    assert.equal(1, result.ops.length);
    console.log("Inserted new data into the collection");
    callback(result);
  });
}

const updateTodo = function(db, elem, callback) {
  // Get the todos collection
  const collection = db.collection('todos');

  var doc = collection.findOne(elem.completed);
  console.log(collection, elem)

  // Update document
  collection.updateOne(elem, { $set: { completed : !elem.completed } }, function(err, result) {
    assert.equal(err, null);
    assert.equal(1, result.result.n);
    console.log("Updated the todo");
    callback(result);
  });  
}

const removeTodo = function(db, elem, callback) {
  console.log(elem)
  // Get the todos collection
  const collection = db.collection('todos');
  // Delete todo
  collection.deleteOne(elem, function(err, result) {
    assert.equal(err, null);
    assert.equal(1, result.result.n);
    console.log("Removed the todo");
    callback(result);
  });    
}


app.use(bodyParser.json())

app.use('/public', express.static(path.resolve(__dirname, '../public')));

app.get('/api/todos', function(req, res) {

  // Use connect method to connect to the server
  MongoClient.connect(url, function(err, client) {
    assert.equal(null, err);
    console.log("Connected correctly to server");
    const db = client.db(dbName);
    findTodos(db, res, function() {
      client.close();
    });
  });

});

app.post('/api/todos', 
  (req, res, next) => {
    if (req.body.title != ''){
      next();
    } else {
      res.status(404).send('Validation error'); 
    }
  },
  (req, res, next) => {
    const todoItem = {
      key: Date.now(),
      title: req.body.title,
      completed: false
    }

    // Use connect method to connect to the server
    MongoClient.connect(url, function(err, client) {
      assert.equal(null, err);
      console.log("Connected correctly to server");
      const db = client.db(dbName);
      insertTodo(db, todoItem, function() {
        findTodos(db, res, function() {
          client.close();
        });
      });
    });

  }
);

app.put('/api/todos/:todoID', function(req, res) {
  const requestID = Number(req.params.todoID);
  let todoItem = {key: requestID}

  // Use connect method to connect to the server
  MongoClient.connect(url, function(err, client) {
    assert.equal(null, err);
    console.log("Connected correctly to server");
    const db = client.db(dbName);
    updateTodo(db, todoItem, function() {
      findTodos(db, res, function() {
        client.close();
      });
    });
  });

});

app.delete('/api/todos/:todoID', function(req, res) {
  const requestID = Number(req.params.todoID);
  let todoItem = {key: requestID}

  // Use connect method to connect to the server
  MongoClient.connect(url, function(err, client) {
    assert.equal(null, err);
    console.log("Connected correctly to server");
    const db = client.db(dbName);
    removeTodo(db, todoItem, function() {
      findTodos(db, res, function() {
        client.close();
      });
    });
  });

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





