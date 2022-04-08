const {Sequelize} = require('sequelize');

const Db = new Sequelize('Groupomania', 'root', process.env.MYSQLPASSWORD, {dialect : 'mysql', host : 'localhost'});

module.exports = Db;