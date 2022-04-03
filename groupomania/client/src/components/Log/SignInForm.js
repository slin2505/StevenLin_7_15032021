import React, { useState } from 'react';
import axios from 'axios';

const SignInForm = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const emailError = document.querySelector(".email.error");
    const passwordError = document.querySelector(".password.error");;

    const handleLogin = (e) =>{
        e.preventDefault();
        emailError.innerHTML = '';
        passwordError.innerHTML = '';
        
        if (!email || !password){
            if (!email){
                emailError.innerHTML = 'Le champ ne peut pas être vide'
            }
            if (!password){
                passwordError.innerHTML = 'Le champ ne peut pas être vide'
            }
        } else{
            axios({
                method : 'post',
                url : 'http://localhost:3000/api/user/login',
                data : {
                    email : email,
                    password : password,
                },
            })
                .then((res) => window.location = '/')
                .catch((err) =>{
                    const errors = err.response.data.error;
                    console.log(errors)
                    if (errors.email){
                        emailError.innerHTML = errors.email;
                    }
                    if (errors.password){
                        passwordError.innerHTML = errors.password;
                    }   
                });
        };
    }

    return (
        <form action='' onSubmit={handleLogin} id='sign-up-form'>
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
            <input type='submit' value='Connexion' />
        </form>
    );
};

export default SignInForm;