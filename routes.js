const express = require('express');
const { login } = require('./AuthController');
const { task, tasks, store, update, deleteTask } = require('./TaskController');
const router = express.Router();

router.post('/login', login);

router.get('/tasks', tasks);

router.post('/tasks', store);

router.get('/tasks/:id', task);

router.put('/tasks/:id', update);

router.delete('/tasks/:id', deleteTask);

module.exports = router;
