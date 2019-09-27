import React from 'react'
import { Grid, makeStyles, Typography, Fab, Icon } from '@material-ui/core'
import FirebaseService from '../services/firebase'

const useStyles = makeStyles((theme) => ({
  cardContent: {
    textAlign: 'center',
    backgroundColor: '#FFF',
    paddingTop: 20,
    paddingBottom: 20,
    boxShadow: '0px 2px 1px -1px rgba(0,0,0,0.12)'
  },
  icon: {
    marginRight: 10
  }
}))

function Register() {
  const classes = useStyles()

  return (
    <Grid item xs={12}>
      <div className={classes.cardContent}>
        <Fab
          variant="extended"
          color="primary"
          onClick={() => FirebaseService.register()}
        >
          <Icon className={classes.icon}>access_time</Icon>
          <Typography>Register</Typography>
        </Fab>
      </div>
    </Grid>
  )
}

export default Register
