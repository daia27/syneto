import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import './App.scss';
import "bootstrap/dist/css/bootstrap.css"
import Home from "./views/Home";
import Navbar from "./components/Navbar";
import {AppContext} from './Context';

class App extends Component {


  render() {
    return (
        <AppContext.Provider value={{state: this.state, setState: this.setState}}>
            <div className="App">
                <Router>
                  <div>
                      <Navbar/>
                      <ul>
                          <li>
                              <Link to="/">Home</Link>
                          </li>
                      </ul>

                      <Route exact path="/" component={Home} />
                  </div>
                </Router>
            </div>
        </AppContext.Provider>
    );
  }
}

export default App;
