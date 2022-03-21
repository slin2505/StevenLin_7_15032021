const Post = require('../models/post.model');
const User = require('../models/user.model');

exports.readPost = (req, res) =>{
    Post.findAll()
        .then(posts => res.status(200).json(posts))
        .catch(err => res.status(400).json(err))
};

exports.readOnePost = (req, res) =>{
    User.findOne({where : {id : req.params.id}})
        .then(post => res.status(200).json({post}))
        .catch(err => res.status(404).json({err}))
};

exports.createPost = (req, res) =>{
    let postUpload = null;
    if(req.file){
        postUpload = `${req.protocol}://${req.get('host')}/uploads/${req.file.filename}`;
    };
    const newPost = {
        userId : req.body.userId,
        title : req.body.title,
        content : req.body.content,
        upload : postUpload
    }
    Post.create(newPost)
        .then(() => res.status(201).json({message : 'Post crée'}))
        .catch(err => res.status(400).json({err}));
};

exports.updatePost = (req, res) =>{
    let postUpload = null;
    let postUpdate = null;

    if(req.file){
        postUpload = `${req.protocol}://${req.get('host')}/uploads/${req.file.filename}`;

        Post.findOne({where : {id : req.params.id}})
        .then(post =>{
            const filename = post.image.split("/uploads/")[1];
            fs.unlink(`uploads/${filename}`, () =>{});       
        })
        .catch(err => res.status(400).json({err}));
        
        postUpdate = {
            title : req.body.title,
            content : req.body.content,
            upload : postUpload
        }
    } else{
        postUpdate = {
            title : req.body.title,
            content : req.body.content
        }
    };

    User.update(postUpdate, {where : {id : req.params.id}})
        .then(() => res.status(200).json({message : "Post mise à jour."}))
        .catch(err => res.status(400).json({err}));
};

exports.deletePost = (req, res) =>{
    Post.findOne({where : {id : req.params.id}})
    .then(post =>{
        if(!post){
            return res.status(404).json({msg : 'Post introuvable'});
        };
        if(post.upload != null){
            const filename = post.image.split("/uploads/")[1];
            fs.unlink(`uploads/${filename}`, () =>{});
        }
        Post.destroy({where : {id : req.params.id}})
            .then(() => res.status(200).json({message : "Post supprimé."}))
            .catch(err => res.status(400).json({err}));
    })
    .catch(err => res.status(400).json({err}));
};