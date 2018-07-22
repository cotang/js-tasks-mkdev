import React from 'react';
import ReactDOM from 'react-dom';
import { HashRouter, Route, Switch } from 'react-router-dom';

import About from './About';
import Menu from './Menu';
import Forecast from './Forecast';
import Weather from './Weather';

import './index.css';
import registerServiceWorker from './registerServiceWorker';

import '../node_modules/bootstrap/dist/css/bootstrap.min.css';



ReactDOM.render(
  <HashRouter>
    <div>
      <Menu />
      <Switch>
        <Route exact path="/" component={Weather} /> 
        <Route path="/forecast" component={Forecast} /> 
        <Route path="/about" component={About}/>   
      </Switch>   
    </div>
  </HashRouter>,
  document.getElementById('root')
);
registerServiceWorker();