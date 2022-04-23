import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './vendor/normalize.scss';

import './App.scss';
import Register from './pages/Register/Register';
import Login from './pages/Login/Login';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<h1>Привет Арканоид</h1>}/>
        <Route path="/register" element={<Register/>}/>
        <Route path="/login" element={<Login/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
