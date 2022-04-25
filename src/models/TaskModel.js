const database = require('../database/db');
const Sequelize = require('sequelize');

const Task = database.define('tasks', {
    idTask: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
    },
    title: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    description: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    isDone: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: false,
    },
    userId: {
        type: Sequelize.INTEGER,
        references: {
            model: 'Users',
            key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
        allowNull: false,
    },
    createdAt: {
        type: Sequelize.DATE,
        defaultValue: new Date(),
        allowNull: false,
    },
    updatedAt: {
        type: Sequelize.DATE,
        defaultValue: new Date(),
        allowNull: false,
    },
});

module.exports = Task;