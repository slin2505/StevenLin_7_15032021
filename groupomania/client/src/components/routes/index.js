import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from '../../pages/Home';
import Profil from '../../pages/Profil';
import NavBar from '../NavBar';

const Router = () => {
    return (
        <BrowserRouter>
            <NavBar />
            <Routes>
                <Route path='/' element={<Home />}></Route>
                <Route path='/profil' element={<Profil />}></Route>
                <Route path='*' element={<Home />}></Route>
            </Routes>
        </BrowserRouter>
    );
};

export default Router;