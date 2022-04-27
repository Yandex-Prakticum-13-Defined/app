import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import './App.scss';
import Start from './pages/Start/Start';
import Game from './pages/Game/Game';
import Register from './pages/Register/Register';
import Login from './pages/Login/Login';
import Error404 from './pages/Error/Error404';
import Error500 from './pages/Error/Error500';
import Leaderboard from './pages/Leaderboard/Leaderboard';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Start/>}/>
        <Route path="/game" element={<Game/>}/>
        <Route path="/register" element={<Register/>}/>
        <Route path='/leaderboard' element={<Leaderboard />}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/404" element={<Error404/>}/>
        <Route path="/500" element={<Error500/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
