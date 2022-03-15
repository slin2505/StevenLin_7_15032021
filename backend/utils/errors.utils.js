module.exports.registerErrors = (err) =>{
    let errors = {nom : '', prenom : '', email : '', password : ''};

    err.errors.map(e => {
        if (e.message.includes('nom')){
            errors.nom = 'Nom incorrect';
        };
    
        if (e.message.includes('prenom')){
            errors.prenom = 'Prenom incorrect';
        };
    
        if (e.message.includes('email')){
            errors.email = 'Email incorrect ou déjà pris';
        };
    
        if (e.message.includes('password')){
            errors.password = 'Mot de passe invalide !';
        };
    });

    return errors;
};
