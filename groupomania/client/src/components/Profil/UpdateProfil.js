import React from 'react';
import { useSelector } from 'react-redux';
import LeftNav from '../LeftNav';
import UploadImg from './UploadImg';

const UpdateProfil = () => {
    const userData = useSelector((state) => state.userReducer);
    return (
        <div className='profil-container'>
            <LeftNav />
            <h1> Profile de {userData.first_name}</h1>
            <div className='update-container'>
                <div className='left-part'>
                    <h3>Photo de profile</h3>
                    <img src={userData.upload} alt='user-pic'/>
                    <UploadImg />
                </div>
            </div>
        </div>
    );
};

export default UpdateProfil;