module.exports.registerErrors = (err) =>{
    console.log(err.errors)
    let errors = {lastName : '', firstName : '', email : '', password : ''};

    err.errors.map(e => {
        if (e.message.includes('last_name')){
            errors.lastName = 'Nom incorrect';
        };
    
        if (e.message.includes('first_name')){
            errors.firstName = 'Prenom incorrect';
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
