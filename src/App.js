import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Grid from '@material-ui/core/Grid'
import Register from './components/register/Register'
import History from './components/history/History'

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1
  }
}))

function App() {
  const classes = useStyles()

  return (
    <Grid
      container
      direction="column"
      justify="center"
      alignItems="stretch"
      spacing={3}
    >
      <Register />
      <History />
    </Grid>
  )
}

export default App
