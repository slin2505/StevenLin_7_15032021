const { DataTypes } = require('sequelize');
const db = require('../config/db');
const User = require('./user.model');
const Post = require('./post.model');

const commentModel = db.define('comment', {
    id : {
        type : DataTypes.INTEGER,
        primaryKey : true,
        autoIncrement : true,
        allowNull : false
    },

    content : {
        type : DataTypes.TEXT,
        allowNull : false
    },

    upload : {
        type : DataTypes.STRING,
        allowNull : true
    },
});

commentModel.belongsTo(User, {foreignKey : 'user_id'});
commentModel.belongsTo(Post, {foreignKey : 'post_id'});

module.exports = commentModel;