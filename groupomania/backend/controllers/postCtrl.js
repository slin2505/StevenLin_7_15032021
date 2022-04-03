const Post = require('../models/post.model');
const PostLike = require('../models/postLike.model');
const User = require('../models/user.model');
const fs = require('fs');

// Récupère tout les posts
exports.readPost = (req, res) =>{
    Post.findAll({order :[['id', 'DESC']]})
        .then(posts => {
            posts.forEach(post =>{
                if (post.upload !== null){
                    const postUrl = post.upload;
                    const newPostUrl = `${req.protocol}://${req.get('host')}/${postUrl}`;
                    post.upload = newPostUrl;
                }
            });
            res.status(200).json(posts);
        })
        .catch(err => res.status(400).json(err))
};

// récupère un post avec son id
exports.readOnePost = (req, res) =>{
    User.findOne({where : {id : req.params.id}})
        .then(post => {
            if (post.upload !== null){
                const postUrl = post.upload;
                const newPostUrl = `${req.protocol}://${req.get('host')}/${postUrl}`;
                post.upload = newPostUrl;
            };
            res.status(200).json({post});
        })
        .catch(err => res.status(404).json({err}))
};

// création d'un post
exports.createPost = (req, res) =>{
    let postUpload = null;

    // création de l'image si la requete possède un fichier
    if(req.file){
        postUpload = `uploads/${req.file.filename}`;
    };

    // on créer le profile du post 
    const newPost = {
        user_id : req.body.userId,
        content : req.body.content,
        upload : postUpload,
        video : req.body.video
    }

    Post.create(newPost)
        .then(() => res.status(201).json({message : 'Post crée'}))
        .catch(err => res.status(400).json({err}));
};

// mise à a jour d'un post via son id
exports.updatePost = (req, res) =>{
    let postUpload = null;
    let postUpdate = null;

    // si la requete possède un fichier on la traite avec cette fonction
    if(req.file){

        //création de l'image et du profile post
        postUpload = `uploads/${req.file.filename}`;
        postUpdate = {
            content : req.body.content,
            video : req.body.video,
            upload : postUpload,
        }
        
        // suppression de l'ancienne image si elle existe
        Post.findOne({where : {id : req.params.id}})
            .then(post =>{
                if(fs.existsSync(post.upload)){
                    fs.unlink(post.upload, () => {});   
                };
            })
            .catch(err => res.status(400).json({err}));
    } else{
        postUpdate = {
            content : req.body.content,
            video : req.body.video,
        }
    };

    // mise à jour du post via son id
    Post.update(postUpdate, {where : {id : req.params.id}})
        .then(() => res.status(200).json({message : "Post mise à jour."}))
        .catch(err => res.status(400).json({err}));
};

// suppression d'un post
exports.deletePost = (req, res) =>{
    Post.findOne({where : {id : req.params.id}})
    .then(post =>{
        if(!post){
            return res.status(404).json({msg : 'Post introuvable'});
        };
        if(fs.existsSync(post.upload)){
            fs.unlink(post.upload, () =>{});   
        };
        Post.destroy({where : {id : req.params.id}})
            .then(() => res.status(200).json({message : 'Post supprimé'}))
            .catch(err => res.status(400).json({err}));
    })
    .catch(err => res.status(400).json({err}));
};

// Système des likes

// on récupère le nombre de like d'un post via le nombre de ligne existante dans le tableau
exports.getLikeforPost = (req, res) =>{
    PostLike.count({where : {post_id : req.body.postId}})
        .then(likes => res.status(200).json({likes}))
        .catch(err => res.status(400).json({err}))
};

// création d'un post si on ne trouve pas de ligne avec le postId et l'userId de la requete sinon on supprime la ligne , création = +1 like et suppresion = -1 like
exports.likeDislikePost = (req, res) =>{
    PostLike.findOne({where : {post_id : req.body.postId, user_id : req.body.userId}})
        .then(result =>{
            if(result == null){
                PostLike.create({user_id : req.body.userId, post_id : req.body.postId})
                    .then(() => res.status(201).json({message : '+1 like'}))
                    .catch(err =>  res.status(400).json(err));
            } else{
                PostLike.destroy({where : {post_id : req.body.postId, user_id : req.body.userId}})
                    .then(() => res.status(200).json({message : '-1 like'}))
                    .catch(err => res.status(400).json({err}));
            }
        })
        .catch(err => res.status(400).json({err}))
};

// On défini qu'un utilisateur a liké a partir du moment que cette fonction retourne un result autre que NULL
exports.likedByUser = (req, res) =>{
    PostLike.findOne({where : {post_id : req.body.postId, user_id : req.body.userId}})
        .then(result => res.status(200).json({result}))
        .catch(err => res.status(400).json({err}));
};