const jwt = require('jsonwebtoken');
const User = require('../models/user.model')

// On récupère le token dans le header de la requete et on vérifie l'userId
module.exports = (req, res, next) =>{
    try {
        const token = req.cookies.jwt
        const decodedToken = jwt.verify(token, process.env.PASSWORDTOKEN);
        const userId = decodedToken.userId;
        User.findOne({where : {id : userId}})
            .then(result =>{
                if(result == null){
                    res.cookie("jwt", "", { maxAge: 1 });
                    res.status(404).json({message : 'Utilisateur inconnu'})
                } else{
                    next();
                }
            })
    } catch (err) {
        console.log(err)
        res.cookie("jwt", "", { maxAge: 1 });
        res.status(401).json({ message : 'Requête non authentifiée !'});
    };
};