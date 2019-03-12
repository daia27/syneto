import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import './App.scss';
import "bootstrap/dist/css/bootstrap.css"
import Home from "./views/Home";
import Navbar from "./components/Navbar";

class App extends Component {
  render() {
    return (
      <div className="App">
          <Navbar/>
          <Router>
              <div>
                  <ul>
                      <li>
                          <Link to="/">Home</Link>
                      </li>
                  </ul>

                  <Route exact path="/" component={Home} />
              </div>
          </Router>
      </div>
    );
  }
}

export default App;
