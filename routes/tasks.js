var express = require('express');
var router = express.Router();
const route = require('.');

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

router.get('/getTasks', function(req, res, next) {
    res.json(tasks);
});

router.delete('/deleteTask/:id', function(req, res, next) {
    const taskId = parseInt(req.params.id);
    tasks = tasks.filter(task => task.id !== taskId);
    res.json({ message: 'Task deleted successfully'});
});

router.post('/addTask', function(req, res, next) {
    const newTask = {
        id: tasks.length + 1,
        name: req.body.name,
        description: req.body.description
    };
    tasks.push(newTask);
    req.json({ message: 'Task added successfully' });
});

module.exports = router;