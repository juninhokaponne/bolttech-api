const database = require('../database/db');
const Sequelize = require('sequelize');

const Project = database.define('projects', {
    idProject: {
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
        allowNull: true,
    },
});

module.exports = Project;