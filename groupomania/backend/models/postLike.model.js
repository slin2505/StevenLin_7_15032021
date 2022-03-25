const { DataTypes } = require('sequelize');
const db = require('../config/db');
const User = require('../models/user.model');
const Post = require('../models/post.model');

const postLikeModel = db.define('like', {
    id : {
        type : DataTypes.INTEGER,
        primaryKey : true,
        autoIncrement : true,
        allowNull : false
    }
});

postLikeModel.belongsTo(User, {foreignKey : 'user_id'});
postLikeModel.belongsTo(Post, {foreignKey : 'post_id'});

module.exports = postLikeModel;