const express = require('express');
const router = express.Router();

let todos = [];

// Get all todos
router.get('/', (req, res) => {
    res.json(todos);
});

// Create a new todo
router.post('/', (req, res) => {
    const todo = {
        id: todos.length + 1,
        task: req.body.task,
        completed: false
    };
    todos.push(todo);
    res.status(201).json(todo);
});

// Update a todo
router.put('/:id', (req, res) => {
    const todo = todos.find(t => t.id === parseInt(req.params.id));
    if (!todo) return res.status(404).send('Todo not found.');

    todo.task = req.body.task;
    todo.completed = req.body.completed;
    res.json(todo);
});

// Delete a todo
router.delete('/:id', (req, res) => {
    const todoIndex = todos.findIndex(t => t.id === parseInt(req.params.id));
    if (todoIndex === -1) return res.status(404).send('Todo not found.');

    const deletedTodo = todos.splice(todoIndex, 1);
    res.json(deletedTodo);
});

module.exports = router;