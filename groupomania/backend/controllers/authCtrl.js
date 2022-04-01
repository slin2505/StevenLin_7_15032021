const User = require('../models/user.model')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { registerErrors } = require('../utils/errors.utils');

exports.register = (req, res) =>{
    // hash du password
    bcrypt.hash(req.body.password, 10)
        .then(hash =>{
            const newUser = {
                email: req.body.email,
                last_name : req.body.lastName,
                first_name : req.body.firstName,
                password : hash
            };
            // création de l'utilisateur
            User.create(newUser)
                .then(() => res.status(201).json({message : 'Compte crée'}))
                .catch(err => {
                    const authErrors = registerErrors(err);
                    res.status(400).json(authErrors);
                });
        })
        .catch(err => res.status(500).json({err}));
};

exports.login = (req, res) =>{

    // On récupère l'utilisateur dans la BDD et on compare les passwords
    User.findOne({where : {email : req.body.email}})
        .then(user =>{
            if(user == null){
                console.log(user)
                res.status(401).json({error: {email : 'Email inconnu'}})
            } else{
                bcrypt.compare(req.body.password, user.password)
                    .then(valid =>{
                        if(!valid){
                            console.log(valid)
                            res.status(401).json({error: {password : 'Mot de passe incorrect'}});
                        } else{
                            const expireTime = 3 * 24 * 60 * 60 * 1000;
                            const userToken = jwt.sign(
                                {userId : user.id},
                                process.env.PASSWORDTOKEN,
                                {expiresIn: expireTime}
                            );
                            res.cookie('jwt', userToken, {httpOnly : true, maxAge : expireTime});
                            res.status(200).json({userId: user.id});
                        }                  
                    })
                    .catch(err => res.status(500).json({err}));
            }
        })
        .catch(err => res.status(500).json({err}));
};

exports.logout = (req, res) =>{
    res.cookie('jwt', '', { maxAge: 1 });
    res.redirect('/');
};