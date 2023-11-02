import React from 'react'
import WeekView from './components/WeekView'
import Login from './components/Login'
import Register from './components/Register'

import { BrowserRouter, Router, Routes, Route } from 'react-router-dom';

export default function App(){

    return (
        // <Routes>
        //     <Route path='/' element={<WeekView />} />
            
        //     <Route path='/login' element={<Login/>} />

        //     <Route path='/register' element={<Register />} />
        // </Routes>

        <Routes>
            <Route path='/' element={<Login/>} />

            <Route path='/home' element={<WeekView />} />
            
            <Route path='/register' element={<Register />} />
        </Routes>

    );
}