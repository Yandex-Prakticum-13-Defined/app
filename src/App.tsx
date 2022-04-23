import React, {Component} from 'react';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import './vendor/normalize.scss';

import './App.scss';
import {Register} from "./pages/Register/Register";

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<h1 >Привет Арканоид</h1>}  />
          <Route path="/register" element={<Register />}  />
        </Routes>
      </BrowserRouter>
    );
  }
}

export default App;
