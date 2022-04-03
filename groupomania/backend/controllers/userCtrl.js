const User = require('../models/user.model')
const fs = require('fs');
const bcrypt = require('bcrypt');

// Récupère tout les utilisateurs 
exports.getAllUsers = (req, res) =>{
    User.findAll({attributes: {exclude: ['password']}})
        .then(users => {
            users.forEach(user =>{
                const imageUrl = user.upload;
                const newImageUrl = `${req.protocol}://${req.get('host')}/${imageUrl}`;
                user.upload = newImageUrl;
            })
            res.status(200).json(users);
        })
        .catch(err => res.status(400).json(err))
};

// Récupère un utilisateur a partir d'un id
exports.getOneUser = (req, res) =>{
    User.findOne({where : {id : req.params.id}, attributes: {exclude: ['password']}})
        .then(user => {
            const imageUrl = user.upload;
            const newImageUrl = `${req.protocol}://${req.get('host')}/${imageUrl}`;
            user.upload = newImageUrl;
            res.status(200).json({user});
        })
        .catch(err => res.status(404).json({err}))
};

// Mettre à jour les données d'un utilisateur
exports.updateUser = (req, res) =>{
    let userProfile = null;
    let userUpload = null;

    // Fonction si la requete possède un fichier (multimedia)
    if(req.file){
        // Création du fichier et du profile
        userUpload = `uploads/${req.file.filename}`;
        userProfile = {
            first_name : req.body.firstName,
            last_name : req.body.lastName,
            password : req.body.password,
            upload : userUpload
        };

        // avec fs on supprime l'ancienne image si celle ci existe
        User.findOne({where : {id : req.params.id}}, {attributes: {exclude: ['password']}})
            .then(user =>{
                if(fs.existsSync(user.upload && user.upload !== 'uploads/basicUser.png')){
                    fs.unlink(user.upload, () =>{});   
                } 
            })
            .catch(err => res.status(400).json({err}));
    } else{
        userProfile = {
            first_name : req.body.firstName,
            last_name : req.body.lastName,
            password : req.body.password,
        };
    };

    // on hash le password si celle ci existe 
    if(userProfile.password !== undefined){
        bcrypt.hash(req.body.password, 10)
            .then(hash =>{
                userProfile.password = hash
                User.update(userProfile,{where : {id : req.params.id}})
                    .then(() => res.status(200).json({message : "Profile modifié."}))
                    .catch(err => res.status(400).json({err}));
            })
    };
    // mise à jour de l'utilisateur
    User.update(userProfile,{where : {id : req.params.id}})
        .then(() => res.status(200).json({message : "Profile modifié."}))
        .catch(err => res.status(400).json({err}));
};

// suppression d'un utilisateur
exports.deleteUser = (req,res) =>{
    User.findOne({where : {id : req.params.id}}, {attributes: {exclude: ['password']}})
    .then(user =>{
        if(!user){
            return res.status(404).json({msg : 'Utilisateur inconnu'});
        };
        if(fs.existsSync(user.upload && user.upload !== 'uploads/basicUser.png')){
            fs.unlink(user.upload, () =>{});   
        };
        User.destroy({where : {id : req.params.id}})
            .then(() => res.status(200).json({message : "Utilisateur supprimé."}))
            .catch(err => res.status(400).json({err}));
    })
    .catch(err => res.status(400).json({err}));
};