import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import Home from './components/Home';

class App extends Component {
    constructor() {
        super();
        this.state = {};
    }

  render() {
    return (
      <div className="App">
        <Router>
            <Route exact path="/" component={Home}/>
        </Router>
      </div>
    );
  }
}

export default App;
