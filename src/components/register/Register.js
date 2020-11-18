import React from 'react'
import { Grid, Typography, Fab, Icon } from '@material-ui/core'
import * as FirebaseService from '../../services/firebase'
import { useStyles } from '../../style/style'

function Register() {
  const { cardContent, icon } = useStyles()

  return (
    <Grid item xs={12}>
      <div className={cardContent}>
        <Fab
          variant="extended"
          color="primary"
          onClick={() => FirebaseService.register()}
        >
          <Icon className={icon}>access_time</Icon>
          <Typography>Register</Typography>
        </Fab>
      </div>
    </Grid>
  )
}

export default Register
