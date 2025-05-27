var express = require('express');
var router = express.Router();
var mysql = require('mysql');

let goals = [
    {
        id: 1,
        name: 'Goal 1',
        description: 'Description Goal 1'
    },
    {
        id: 2,
        name: 'Goal 2',
        description: 'Description Goal 2'
    },
    {
        id: 3,
        name: 'Goal 3',
        description: 'Description Goal 3'
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

router.get('/getGoals', function(req, res, next) {
    var queryGetGoal = 'SELECT * FROM goals';
    connection.query(queryGetGoal, function(err, results) {
        if(err){
            console.error('Failed to create goal' + err);
            res.status(500).json(err);
        }else{
            res.json(results);
        }
    });
});

router.delete('/deleteGoal/:id', function(req, res, next) {
    if(req.params && req.params.id){
        let id = req.params.id;
        let queryDeleteGoal = 'DELETE FROM goals WHERE id="' + id + '"';
        connection.query(queryDeleteGoal, function(err, results) {
            if(err){
                console.error('Failed to delete goal' + err);
                res.status(500).json(err);
            }else{
                res.status(200).json(results);
            }
        });
    }else { 
        res.status(400).json({});
    }
});

router.post('/addGoal', function(req, res, next) {
    if(req.body && req.body.name && req.body.description && req.body.date){
        let queryAddGoal = 'INSERT INTO goals (name, description, date \
        VALUES ("' + req.body.name + '", "' + req.body.description + '", "' + req.body.date + '");';
        connection.query(queryDeleteGoal, function(err, results) {
            if(err){
                console.error('Failed to add goal' + err);
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