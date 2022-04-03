const { DataTypes } = require('sequelize');
const db = require('../config/db');

const userModel = db.define('user', {
    id : {
        type : DataTypes.INTEGER,
        primaryKey : true,
        autoIncrement : true,
        allowNull : false
    },
    
    email : {
        type : DataTypes.STRING,
        unique : true,
        validate : {isEmail : true},
        allowNull : false
    },

    last_name : {
        type : DataTypes.STRING,
        validate : {isAlpha : true},
        allowNull : false,
    },

    first_name : {
        type : DataTypes.STRING,
        validate : {isAlpha : true},
        allowNull : false,
    },

    password : {
        type : DataTypes.STRING,
        allowNull : false,
    },

    is_admin : {
        type : DataTypes.BOOLEAN,
        defaultValue : false,
    },

    upload : {
        type : DataTypes.STRING,
        defaultValue : 'uploads/basicUser.png',
    }
})

module.exports = userModel;