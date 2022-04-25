const express = require('express');
const router = express.Router();
const userController = require('./controllers/UserController');
const todoController = require('./controllers/TodoController');
const Auth = require('./middleware/Auth');


// Login
router.post('/apiv2/register', userController.createUser);

// Register
router.post('/apiv2/login', Auth.authMiddleware, userController.login);

// create todo list
router.post('/apiv2/create', Auth.authMiddleware, todoController.createTodo);

// list all todos
router.get('/apiv2/list', Auth.authMiddleware, todoController.listAllTodos);

// edit todo
router.put('/apiv2/todo/:id', Auth.authMiddleware, todoController.updateTodo);
module.exports = router;