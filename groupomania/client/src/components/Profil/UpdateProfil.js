import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {  deleteUser, updateBio } from '../../actions/user.actions';
import LeftNav from '../LeftNav';
import UploadImg from './UploadImg';

const UpdateProfil = () => {
    const userData = useSelector((state) => state.userReducer);
    const dispatch = useDispatch();

    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState(''); 
    const [password, setPassword] = useState('');
    const [controlPassword, setControlPassword] = useState('');
    
    const firstNameError = document.querySelector(".firstName.error");
    const lastNameError = document.querySelector(".lastName.error");
    const passwordError = document.querySelector(".password.error");
    const passwordConfirmError = document.querySelector(".password-confirm.error");

    let dataFirstName = `${userData.first_name}`;
    let dataLastName = `${userData.last_name}`;
    useEffect(() =>{ 
        if (userData !== undefined){
            setFirstName(dataFirstName);
            setLastName(dataLastName);
        }
    },[userData, dataFirstName, dataLastName]);

    const handleUpdate = (e) =>{

        //gestion erreur simple
        if (!firstName){
            firstNameError.innerHTML = 'Prenom incorrect'
        }
        if (!lastName){
            lastNameError.innerHTML = 'Nom incorrect'
        }
        if (password && password !== controlPassword){
            if(!password){
                passwordError.innerHTML = 'Mot de passe incorrect'
            };
            passwordConfirmError.innerHTML = 'Les mots de passe ne correspondent pas';
        } else{
            //création et envoie donnée vers l'action
            const data = new FormData();
            data.append('firstName', firstName);
            data.append('lastName', lastName);
            if(password){
                data.append('password', password)
            };
            dispatch(updateBio(data, userData.id))
            window.location = '/';
        }
    };

    const handleDelete = () =>{
        dispatch(deleteUser(userData.id))
        window.location = '/';
        window.location.reload();
    }

    return (
        <div className='profil-container'>
            <LeftNav />
            <h1> Profil de {userData.first_name}</h1>
            <div className='update-container'>
                <div className='left-part'>
                    <h3>Photo de profil</h3>
                    <img src={userData.upload} alt='user-pic'/>
                    <UploadImg />
                    <h4>membre depuis le {userData.createdAt}</h4>
                </div>
                <div className='right-part'>
                    <div className='bio-update'>
                        <h3>Modifier Bio</h3>
                        <form action='' onSubmit={handleUpdate} id='sign-in-form'>

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

                        <label htmlFor='password'>Modifier mot de passe</label>
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
                        </form>
                        <button onClick={handleUpdate}>Valider les modifications</button>
                    </div> 
                </div>
            </div>
            <button onClick={() =>{
                if (window.confirm('Voulez-vous supprimer votre compte ?')){
                    handleDelete()
                }
            }} className='delete'>Suppression du compte</button>
        </div>
    );
};

export default UpdateProfil;