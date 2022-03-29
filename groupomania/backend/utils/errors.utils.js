module.exports.registerErrors = (err) =>{
    let errors = {lastName : '', firstName : '', email : '', password : ''};

    err.errors.map(e => {
        if (e.message.includes('lastName')){
            errors.nom = 'Nom incorrect';
        };
    
        if (e.message.includes('firstName')){
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
