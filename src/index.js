import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './App'
import * as serviceWorker from './serviceWorker'
import 'typeface-roboto'
import { Route, BrowserRouter as Router } from 'react-router-dom'
import Edit from './components/register/Edit'

const routing = (
  <Router>
    <div>
      <Route path="/" component={App} />
      <Route path="/edit/:id" component={Edit} />
    </div>
  </Router>
)

ReactDOM.render(routing, document.getElementById('root'))

serviceWorker.register()
