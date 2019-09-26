import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Fab from '@material-ui/core/Fab';
import Icon from '@material-ui/core/Icon';
import Grid from '@material-ui/core/Grid';

const useStyles = makeStyles(theme => ({
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
}));

function Register() {

  const classes = useStyles();

  return (
    <Grid item xs={12}>
      <div className={classes.cardContent}>
          <Fab variant="extended" color="primary">
              <Icon className={classes.icon}>access_time</Icon> 
              <Typography>Register</Typography>
          </Fab>
      </div>
    </Grid>
  );
}

export default Register;
