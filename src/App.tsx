import React, { Component } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import './vendor/normalize.scss';
import './App.scss';

class App extends Component {
  render() {
    return (
      <Router>
        <div>
          <h1>Тестовая страница</h1>
        </div>
      </Router>
    );
  }
}

export default App;
