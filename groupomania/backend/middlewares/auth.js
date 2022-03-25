const jwt = require('jsonwebtoken');
const User = require('../models/user.model')

// On récupère le token dans le header de la requete et on vérifie l'userId
module.exports.checkUser = (req, res, next) =>{
   const token = req.cookies.jwt;
   if(token){
       jwt.verify(token, process.env.PASSWORDTOKEN, async(err, decodedToken) =>{
           if (err){
               res.locals.user = null;
               res.clearCookie('jwt');
               next();
           } else{
               let user = await User.findByPk(decodedToken.userId);
               res.locals.user = user;
               next()
           }
       })
   } else{
       res.locals.user = null;
       next();
   };
};

module.exports.requireAuth = (req, res, next) =>{
    const token = req.cookies.jwt;
    if(token){
        jwt.verify(token, process.env.PASSWORDTOKEN, async(err, decodedToken) =>{
            if(err){
                console.log(err)
                res.send(200).json('No token')
            } else{
                console.log(decodedToken.userId);
                next()
            }
        });
    } else{
        console.log('No Token');
    };
};