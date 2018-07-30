import React from 'react';
import ReactDOM from 'react-dom';
import './index.less';
import Login from './app/component/login';
import Register from './app/component/register';
import { BrowserRouter, Switch, Redirect, Route } from 'react-router-dom'
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render((
    <BrowserRouter>
        <Switch>
            <Route path="/login" component={Login}></Route>
            <Route path="/register" component={Register}></Route>
            <Redirect from="/" to="/login"></Redirect>
        </Switch>
    </BrowserRouter>
  ), document.getElementById('root'));
registerServiceWorker();
