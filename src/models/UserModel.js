const database = require('../database/db');
const Sequelize = require('sequelize');

const User = database.define('users', {
    id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
    },
    name: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    email: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
    },
    password: {
        type: Sequelize.STRING,
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

module.exports = User;