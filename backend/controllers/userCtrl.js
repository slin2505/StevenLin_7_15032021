const User = require('../models/user.model')
const bcrypt = require('bcrypt');

exports.getAllUsers = (req, res) =>{
    User.findAll({attributes: {exclude: ['password', 'createdAt', 'updatedAt']}})
        .then(users => res.status(200).json(users))
        .catch(err => res.status(400).json(err))
};

exports.getOneUser = (req, res) =>{
    User.findOne({where : {id : req.params.id}, attributes: {exclude: ['password', 'createdAt', 'updatedAt']}})
        .then(user => res.status(200).json({user}))
        .catch(err => res.status(404).json({err}))
};

exports.updateUser = (req, res) =>{
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

exports.deleteUser = (req,res) =>{
    User.destroy({where : {id : req.params.id}})
        .then(() => res.status(200).json({message : "Utilisateur supprimé."}))
        .catch(err => res.status(400).json({err}));
};