const User = require('../models/user.model')
const fs = require('fs');
const bcrypt = require('bcrypt');

exports.getAllUsers = (req, res) =>{
    User.findAll({attributes: {exclude: ['password']}})
        .then(users => res.status(200).json(users))
        .catch(err => res.status(400).json(err))
};

exports.getOneUser = (req, res) =>{
    User.findOne({where : {id : req.params.id}, attributes: {exclude: ['password']}})
        .then(user => res.status(200).json({user}))
        .catch(err => res.status(404).json({err}))
};

exports.updateUser = (req, res) =>{
    let userImage = null;
    if(req.file){
        userImage = `${req.protocol}://${req.get('host')}/uploads/${req.file.filename}`;

        User.findOne({where : {id : req.params.id}}, {attributes: {exclude: ['password']}})
        .then(user =>{
            const filename = user.image.split("/uploads/")[1];
            fs.unlink(`uploads/${filename}`, () =>{
                bcrypt.hash(req.body.password, 10)
                .then(hash => {
                    User.update({
                        nom : req.body.nom,
                        prenom : req.body.prenom,
                        password : hash,
                        image : userImage
                    }, {where : {id : req.params.id}})
                        .then(() => res.status(200).json({message : "Profile mise à jour."}))
                        .catch(err => res.status(400).json({err}));
                });
            });       
        })
        .catch(err => res.status(400).json({err}));
    } else{
        bcrypt.hash(req.body.password, 10)
        .then(hash => {
            User.update({
                nom : req.body.nom,
                prenom : req.body.prenom,
                password : hash
            }, {where : {id : req.params.id}})
                .then(() => res.status(200).json({message : "Profile mise à jour."}))
                .catch(err => res.status(400).json({err}));
        });
    };
};

exports.deleteUser = (req,res) =>{
    User.findOne({where : {id : req.params.id}}, {attributes: {exclude: ['password']}})
    .then(user =>{
        if(!user){
            return res.status(404).json({msg : 'Utilisateur inconnu'});
        };
        const filename = user.image.split("/uploads/")[1];
        fs.unlink(`uploads/${filename}`, () =>{
            User.destroy({where : {id : req.params.id}})
            .then(() => res.status(200).json({message : "Utilisateur supprimé."}))
            .catch(err => res.status(400).json({err}));
        });
    })
    .catch(err => res.status(400).json({err}));
};