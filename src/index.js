import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './App'
import * as serviceWorker from './serviceWorker'
import 'typeface-roboto'
import { MuiPickersUtilsProvider } from '@material-ui/pickers'
import MomentUtils from '@date-io/moment'
import { Route, Switch, BrowserRouter as Router } from 'react-router-dom'
import Edit from './components/register/Edit'
import Menu from './components/Menu'

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
)

ReactDOM.render(routing, document.getElementById('root'))

serviceWorker.register()
