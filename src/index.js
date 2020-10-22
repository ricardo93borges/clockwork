import React from 'react';
import ReactDOM from 'react-dom';
import { Route, Switch, BrowserRouter as Router } from 'react-router-dom';

import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import MomentUtils from '@date-io/moment';
import * as serviceWorker from './serviceWorker';

import Edit from './components/register/Edit';
import Menu from './components/Menu';
import App from './App';

import 'typeface-roboto';
import './index.css';

const routing = (
  <MuiPickersUtilsProvider utils={MomentUtils}>
    <div style={{ flexGrow: 1 }}>
      <Router>
        <Menu />
        <Switch>
          <Route path="/" exact component={App} />
          <Route path="/register/edit/:id" component={Edit} />
        </Switch>
      </Router>
    </div>
  </MuiPickersUtilsProvider>
);

ReactDOM.render(routing, document.getElementById('root'));

serviceWorker.register();
