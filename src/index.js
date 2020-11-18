import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './App'
import * as serviceWorker from './serviceWorker'
import 'typeface-roboto'
import { MuiPickersUtilsProvider } from '@material-ui/pickers'
import DateFnsUtils from '@date-io/date-fns'
import { Grid } from '@material-ui/core'
import { Route, Switch, BrowserRouter as Router } from 'react-router-dom'
import Edit from './components/register/Edit'
import Menu from './components/Menu'
import Report from './components/report/Report'

const routing = (
  <MuiPickersUtilsProvider utils={DateFnsUtils}>
    <Grid container>
      <Router>
        <Menu />
        <Switch>
          <Route path="/" exact component={App} />
          <Route path="/register/edit/:id" component={Edit} />
          <Route path="/report" component={Report} />
        </Switch>
      </Router>
    </Grid>
  </MuiPickersUtilsProvider>
)

ReactDOM.render(routing, document.getElementById('root'))

serviceWorker.register()
