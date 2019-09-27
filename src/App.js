import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Grid from '@material-ui/core/Grid'
import Menu from './components/Menu'
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
    <div className={classes.root}>
      <Menu />
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
    </div>
  )
}

export default App
