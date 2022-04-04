import React, { useState } from 'react';
import axios from 'axios';
import SignInForm from './SignInForm';

const SignUpForm = () => {
    const [formSubmit, setFormSubmit] = useState(false);
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [controlPassword, setControlPassword] = useState('');

    const firstNameError = document.querySelector(".firstName.error");
    const lastNameError = document.querySelector(".lastName.error");
    const emailError = document.querySelector(".email.error");
    const passwordError = document.querySelector(".password.error");
    const passwordConfirmError = document.querySelector(".password-confirm.error");
    const termsError = document.querySelector(".terms.error");
    const terms = document.querySelector('#terms');

    const handleRegister = async (e) =>{
        e.preventDefault();
        emailError.innerHTML = '';
        firstNameError.innerHTML = '';
        lastNameError.innerHTML = '';
        passwordError.innerHTML = '';
        passwordConfirmError.innerHTML = '';
        termsError.innerHTML = '';
        
        if (!email){
            emailError.innerHTML = 'Le champ ne peut pas être vide'
        }
        if (!firstName){
            firstNameError.innerHTML = 'Le champ ne peut pas être vide'
        }
        if (!lastName){
            lastNameError.innerHTML = 'Le champ ne peut pas être vide'
        }
        if (!password){
            passwordError.innerHTML = 'Le champ ne peut pas être vide'
        }
        if (password !== controlPassword || !terms.checked){
            if (password !== controlPassword){
                passwordConfirmError.innerHTML = 'Les mots de passe ne correspondent pas';
            };
    
            if(!terms.checked){
                termsError.innerHTML = 'Veuillez valider les conditions générales';
            };
        } else{
            await axios({
                method : 'post',
                url : 'http://localhost:3000/api/user/register',
                withCredentials : true,
                data : {
                    firstName : firstName,
                    lastName : lastName,
                    email : email,
                    password : password,
                },
            })
                .then((res) =>{setFormSubmit(true)})
                .catch((err) => {
                    const errors = err.response.data
                    if (errors.authErrors.firstName){
                        firstNameError.innerHTML = errors.authErrors.firstName;
                    };
                    if (errors.authErrors.lastName){
                        lastNameError.innerHTML = errors.authErrors.lastName;
                    };
                    if (errors.authErrors.email){
                        emailError.innerHTML = errors.authErrors.email;
                    };
                    if (errors.authErrors.password){
                        passwordError.innerHTML = errors.authErrors.password;
                    };
                });
        };
    };

    return (
        <>
            {formSubmit ? (
                <>
                    <SignInForm />
                    <h4 className='success'>Enregistrement réussi</h4>
                </>
            ) : (
                <form action='' onSubmit={handleRegister} id='sign-in-form'>

                <label htmlFor='firstName'>Prenom</label>
                <br />
                <input 
                    type='text'
                    name='firstName'
                    id='firstName'
                    onChange={(e) => setFirstName(e.target.value)} 
                    value= {firstName}
                />
                <div className='firstName error'></div>
                <br />

                <label htmlFor='lastName'>Nom</label>
                <br />
                <input 
                    type='text'
                    name='lastName'
                    id='lastName'
                    onChange={(e) => setLastName(e.target.value)} 
                    value= {lastName}
                />
                <div className='lastName error'></div>
                <br />

                <label htmlFor='email'>Email</label>
                <br />
                <input 
                    type='text' 
                    name='email' 
                    id='email' 
                    onChange={(e) => setEmail(e.target.value)} 
                    value= {email}
                />
                <div className='email error'></div>
                <br />

                <label htmlFor='password'>Mot de passe</label>
                <br />
                <input 
                    type='password' 
                    name='password' 
                    id='password'
                    onChange={(e) => setPassword(e.target.value)} 
                    value= {password}
                />
                <div className='password error'></div>
                <br />

                <label htmlFor='password-conf'>Confirmer le mot de passe</label>
                <br />
                <input 
                    type='password' 
                    name='password-conf' 
                    id='password-conf'
                    onChange={(e) => setControlPassword(e.target.value)} 
                    value= {controlPassword}
                />
                <div className='password-confirm error'></div>
                <br />

                <input type='checkbox' id='terms' />
                <label htmlFor='terms'>
                    J'accepte les <a href='/' target='blank' rel='noopener noreferrer'>conditions générales</a>
                </label>
                <div className='terms error'></div>
                <br />

                <input type='submit' value='Connexion' />
            </form>
        )}
    </>
    );
};

export default SignUpForm;