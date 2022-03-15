const { DataTypes } = require('sequelize');
const db = require('../config/db');
const User = require('./user.model');

const postModel = db.define('post', {
    id : {
        type : DataTypes.INTEGER,
        primaryKey : true,
        autoIncrement : true,
        allowNull : false
    },
    
    title : {
        type : DataTypes.STRING,
        allowNull : false
    },

    content : {
        type : DataTypes.TEXT,
        allowNull : false
    },

    image : {
        type : DataTypes.STRING,
        allowNull : true
    }
});

postModel.belongsTo(User);

module.exports = postModel;