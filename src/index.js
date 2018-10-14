import React from 'react';
import { render} from 'react-dom';
import { Router, Route, hashHistory } from 'react-router'
import './index.css';
import App from './App';
import CalcRouteScript from './components/jinhao/CalcRouteScript';
import * as serviceWorker from './serviceWorker';
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.min.js.map'

render((
    <Router history={hashHistory}>
        {/*<Route path="/" component={App}/>*/}
        <Route path="/bbb" component={CalcRouteScript}/>
    </Router>
), document.getElementById('root'));


// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
