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

    nom : {
        type : DataTypes.STRING,
        validate : {isAlpha : true},
        allowNull : false,
    },

    prenom : {
        type : DataTypes.STRING,
        validate : {isAlpha : true},
        allowNull : false,
    },

    password : {
        type : DataTypes.STRING,
        allowNull : false,
    },

    image : {
        type : DataTypes.STRING,
        defaultValue : './uploads/profil/basicUser.png',
    }
})

module.exports = userModel;