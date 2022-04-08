import React, { useContext } from 'react';
import Log from '../components/Log';
import { Uidcontext } from '../components/appContext';
import UpdateProfil from '../components/Profil/UpdateProfil';

const Profil = () => {
    const uid = useContext(Uidcontext)

    return (
        <div className='profil-page'>
            {uid ?(
                <UpdateProfil />
            ) : (
                <div className='log-container'>
                    <Log signin={false} signup={true} />
                    <div className='img-container'>
                        <img src='./img/icon-above-font.svg' alt='img-log' />
                    </div>
                </div>
            )}
        </div>
    );
};

export default Profil;