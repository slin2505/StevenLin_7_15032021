import React, { useRef, useState} from 'react';
import axios from 'axios';

const SignInForm = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const emailError = useRef(null);
    const passwordError = useRef(null);

    const handleLogin = (e) =>{
        e.preventDefault();

        axios({
            method : 'post',
            url : 'http://localhost:3000/api/user/login',
            withCredentials : true,
            data : {
                email : email,
                password : password,
            },
        })
            .then((res) => {
                console.log(res.data)
                if (res.data.errors){
                    emailError.innerHTML = res.data.error.email
                    passwordError.innerHTML = res.data.error.password;
                } else{
                    window.location = '/';
                }
            })
            .catch((err) => console.log(err));
    };

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
            <div className='email error' ref={emailError}></div>
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
            <div className='password error' ref={passwordError}></div>
            <br />
            <input type='submit' value='Connexion' />
        </form>
    );
};

export default SignInForm;