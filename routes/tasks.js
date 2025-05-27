var express = require('express');
var router = express.Router();
var mysql = require('mysql');

let tasks = [
    {
        id: 1,
        name: 'Task 1',
        description: 'Description task 1'
    },
    {
        id: 2,
        name: 'Task 2',
        description: 'Description task 2'
    },
    {
        id: 3,
        name: 'Task 3',
        description: 'Description task 3'
    }
]

// Connection with mysql
var connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  database: 'mysql'
});

connection.connect(function(err) {
  if(err){
    console.error('Error connecting: ' + err.stack);
    return;
  }
  
  console.log('Connected as id: ' + connection.threadId);
});

router.get('/getTasks', function(req, res, next) {
    var queryGetTask = 'SELECT * FROM tasks';
    connection.query(queryGetTask, function(err, results) {
        if(err){
            console.error('Failed to create task' + err);
            res.status(500).json(err);
        }else{
            res.json(results);
        }
    });
});

router.delete('/deleteTask/:id', function(req, res, next) {
    if(req.params && req.params.id){
        let id = req.params.id;
        let queryDeleteTask = 'DELETE FROM tasks WHERE id="' + id + '"';
        connection.query(queryDeleteTask, function(err, results) {
            if(err){
                console.error('Failed to delete task' + err);
                res.status(500).json(err);
            }else{
                res.status(200).json(results);
            }
        });
    }else { 
        res.status(400).json({});
    }
});

router.post('/addTask', function(req, res, next) {
    if(req.body && req.body.name && req.body.description && req.body.date){
        let queryAddTask = 'INSERT INTO tasks (name, description, date \
        VALUES ("' + req.body.name + '", "' + req.body.description + '", "' + req.body.date + '");';
        connection.query(queryAddTask, function(err, results) {
            if(err){
                console.error('Failed to add task' + err);
                res.status(400).json(err);
            }else{
                res.status(200).json(results);
            }
        });
    }else { 
        res.status(400).json({});
    }
});

module.exports = router;