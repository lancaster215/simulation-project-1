import React, {Component} from 'react';
import './App.css';
import { HashRouter } from 'react-router-dom';

import Routes from './route';

export default class App extends Component{
  render() {
    return (
      // <React.Fragment>
        <HashRouter>
          {/* <Link to="/" className="links">Sign In</Link>
          <Link to="/registration" className="links">Sign Up</Link> */}
          <Routes/>
        </HashRouter>
      // </React.Fragment>
    );
  }
}