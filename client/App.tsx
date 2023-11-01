import React from 'react'
import WeekView from './components/WeekView'
import Login from './components/Login'
import { BrowserRouter, Router, Routes, Route } from 'react-router-dom';

export default function App(){
    return (
        <Routes>
            <Route path='/' element={<WeekView />} />
            <Route path='/login' element={<Login />} />
        </Routes>
    );
}
