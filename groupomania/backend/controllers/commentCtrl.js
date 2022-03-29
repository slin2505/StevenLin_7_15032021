const Comment = require('../models/comment.model');
const fs = require('fs');

exports.readPostComment = (req, res) =>{
    Comment.findAll({where : {post_id : req.body.postId}})
        .then(comment => res.status(200).json(comment))
        .catch(err => res.status(400).json(err))
};

exports.readOneComment = (req, res) =>{
    Comment.findOne({where : {id : req.params.id}})
        .then(comment => res.status(200).json(comment))
        .catch(err => res.status(400).json(err))
};

exports.createComment = (req, res) =>{
    let commentUpload = null;
    if(req.file){
        commentUpload = `uploads/${req.file.filename}`;
    };
    const newComment = {
        user_id : req.body.userId,
        post_id : req.body.postId,
        content : req.body.content,
        upload : commentUpload
    }
    Comment.create(newComment)
        .then(() => res.status(201).json({message : 'Commentaire crée'}))
        .catch(err => res.status(400).json({err}));
};

exports.updateComment = (req, res) =>{
    let commentUpload = null;
    let commentUpdate = null;

    if(req.file){
        commentUpload = `uploads/${req.file.filename}`;
        commentUpdate = {
            content : req.body.content,
            upload : commentUpload
        }

        Comment.findOne({where : {id : req.body.commentId}})
            .then(comment =>{
                if(fs.existsSync(comment.upload)){
                    fs.unlink(comment.upload, () => {});   
                };
            })
            .catch(err => res.status(400).json({err}));
    } else{
        commentUpdate = {
            content : req.body.content              
        }
    };

    Comment.update(commentUpdate, {where : {id : req.body.commentId}})
        .then(() => res.status(200).json({message : "Commentaire mise à jour."}))
        .catch(err => res.status(400).json({err}));
};

exports.deleteComment = (req, res) =>{
    Comment.findOne({where : {id : req.body.commentId}})
    .then(comment =>{
        if(!comment){
            return res.status(404).json({msg : 'Commentaire introuvable'});
        };
        if(fs.existsSync(comment.upload)){
            fs.unlink(comment.upload, () =>{});   
        };
        Comment.destroy({where : {id : req.body.commentId}})
            .then(() => res.status(200).json({message : "Commentaire supprimé."}))
            .catch(err => res.status(400).json({err}));
    })
    .catch(err => res.status(400).json({err}));
};