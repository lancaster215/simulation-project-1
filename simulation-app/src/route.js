import React from 'react';
import { Route,Switch } from 'react-router-dom';
import Registration from './components/Registration/Registration';
import Login from './components/Login/Login';
import Usermanagement from './components/Usermanagement/Usermanagement';
export default function Routes(){
    return(
        <Switch>
            <Route component={Login} path='/' exact></Route>
            <Route component={Registration} path='/registration'></Route>
            <Route component={Usermanagement} path='/usermanagement'></Route>
        </Switch>
    )
}