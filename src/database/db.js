// create connection with database
const Sequelize = require('sequelize');
require('dotenv').config();

const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASS, {
    host: process.env.DB_HOST,
    dialect: process.env.DB_DIALECT,
    port: process.env.DB_PORT,
    logging: false,
})

sequelize.authenticate()
    .then(() => {
        console.log('Database connection successful')
    })
    .catch(() => {
        console.log('Database connection failed')
    })

module.exports = sequelize;