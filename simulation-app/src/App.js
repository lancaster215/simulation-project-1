import React, {Component} from 'react';
import './App.css';
import { HashRouter, Route, Switch } from 'react-router-dom';

import Registration from './components/Registration/Registration';
import Login from './components/Login/Login';
// import UserManagement from '../components/UserManagement';

export default class App extends Component{
  render() {
    return (
      <React.Fragment>
        <HashRouter>
          <Switch>
            <Route component={Registration} path='/registration'></Route>
            <Route component={Login} path='/' exact></Route>
            {/* <Registration/> */}
          </Switch>
        </HashRouter>
      </React.Fragment>
    );
  }
}