import React from 'react'
import Grid from '@material-ui/core/Grid'
import Register from './components/register/Register'
import History from './components/history/History'

function App() {
  return (
    <Grid container>
      <Register />
      <History />
    </Grid>
  )
}

export default App
