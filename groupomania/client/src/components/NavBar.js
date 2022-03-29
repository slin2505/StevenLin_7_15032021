import React, { useContext } from 'react';
import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { Uidcontext } from './appContext';
import Logout from './Log/Logout';

const NavBar = () => {
    const uid = useContext(Uidcontext);
    const userData = useSelector((state) => state.userReducer);

    return (
        <nav>
            <div className='nav-container'>
                <div className='logo'>
                    <NavLink to='/'>
                        <div className='logo'>
                            <img src='./img/icon-left-font-monochrome-black.svg' alt='logo' />
                        </div>
                    </NavLink>
                </div>
                {uid ? (
                    <ul>
                        <li></li>
                        <li className='welcome'>
                            <NavLink to='/profil'>
                                <h5>Bienvenue {userData.first_name}</h5>
                            </NavLink>
                        </li>
                        <Logout />
                    </ul>
                ) : (
                    <ul>
                        <li></li>
                        <li>
                            <NavLink to='/profil'>
                                <img src='./img/icons/login.svg' alt='login' />
                            </NavLink>
                        </li>
                    </ul>
                )}
            </div>
        </nav>
    );
};

export default NavBar;