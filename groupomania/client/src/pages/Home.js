import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { Uidcontext } from '../components/appContext';
import LeftNav from '../components/LeftNav';
import PostForm from '../components/Post/PostForm';
import Thread from '../components/Thread';

const Home = () => {
    const uid = useContext(Uidcontext);

    return (
        <div className='home'>
            <LeftNav />
            <div className='main'>
                <div class='home-header'>
                    {uid ? <PostForm /> : null}
                </div>
                {uid ?  <Thread /> : (
                    <Link to='/profil' className='main-unconnected'>
                        Cliquer ici ou sur l'image pour vous inscrire.
                        <img src='./img/icon-above-font.svg' alt='iconAbove' />
                    </Link>
                )}
            </div>
        </div>
    );
};

export default Home;