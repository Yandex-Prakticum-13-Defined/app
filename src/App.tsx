import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.scss';
import Leaderboard from './pages/Leaderboard/Leaderboard';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/leaderboard" element={<Leaderboard />}/>
      </Routes>
    </Router>
  );
}

export default App;
