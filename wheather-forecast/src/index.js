import React from 'react';
import ReactDOM from 'react-dom';
import { HashRouter, Route, Switch } from 'react-router-dom';

import About from './About';
import Menu from './Menu';

import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';



ReactDOM.render(
  <HashRouter>
    <div>
      <Menu />
      <Switch>
	      <Route exact path="/" component={App} />   
	      <Route path="/about" component={About}/>   
      </Switch>   
    </div>
  </HashRouter>,
  document.getElementById('root')
);
registerServiceWorker();