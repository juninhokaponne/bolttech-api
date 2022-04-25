const Task = require('../models/TaskModel');

class HttpException extends Error {
    message;
    status;
    code;

    constructor(message, status, code) {
        super(message);
        this.message = message;
        this.status = status;
        this.code = code;
    }
}

module.exports = {

    async createTodo(req, res) {
            
            function validadeTodoFields(title, description){
    
                if(!title || !description){
                    throw new HttpException('Preencha todos os campos', 400, 'Preencha todos os campos');
                }
                if(title.length > 50){
                    throw new HttpException('Título inválido', 400, 'Título inválido');
                }
                if(description.length > 255){
                    throw new HttpException('Descrição inválida', 400, 'Descrição inválida');
                }
            }
    
            const { title, description } = req.body;
    
            try {
    
                validadeTodoFields(title, description);
                const todo = await Task.create({
                    title,
                    description,
                    userId: req.userId,
                });
    
                return res.status(201).json({
                    message: 'Todo created',
                    todo
                });
    
            } catch (error) {
                return res.status(400).json({
                    message: 'Error creating todo',
                    error
                });
            }
    },

    async listAllTodos(req, res) {
        try {
            const todos = await Task.findAll({
                where: {
                    userId: req.userId,
                },
                order: [
                    ['idTask', 'DESC']
                ]
            });
            return res.status(200).json({
                message: 'Todos retrieved',
                todos
            });
        } catch (error) {
            return res.status(400).json({
                message: 'Error retrieving todos',
                error
            });
        }
    },

    async updateTodo(req, res) {
        const { idTask } = req.params;
        const { title, description, isDone } = req.body;

        function validadeTodoFields(title, description){

            if(!title || !description){
                throw new HttpException('Fill in all fields.', 400, 'Fill in all fields.');
            }
            if(title.length > 50){
                throw new HttpException('Invalid title.', 400, 'Invalid title.');
            }
            if(description.length > 255){
                throw new HttpException('Invalid description.', 400, 'invalid description.');
            }

            // cannot edit isDone field
            if(isDone){
                throw new HttpException('Cannot edit a completed task.', 400, 'Cannot edit a completed task.');
            }
        }

        try {
            validadeTodoFields(title, description);
            const todo = await Task.findOne({
                where: {
                    idTask,
                    userId: req.userId,
                }
            });
            if(!todo){
                throw new HttpException('Todo not found', 404, 'Todo not found');
            }
            await todo.update({
                title,
                description,
            });
            return res.status(200).json({
                message: 'Todo updated',
                todo
            });
        } catch (error) {
            if(error instanceof HttpException){
                return res.status(error.status).json({
                    message: error.message,
                    error
                });
            }
        }
    },
}