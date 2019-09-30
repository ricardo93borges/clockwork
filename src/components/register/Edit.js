import React, { useState, useEffect } from 'react'
import * as moment from 'moment'
import {
  Grid,
  Card,
  CardContent,
  Typography,
  Button,
  Divider,
  makeStyles
} from '@material-ui/core'
import { KeyboardTimePicker } from '@material-ui/pickers'
import FirebaseService from '../../services/firebase'

const useStyles = makeStyles((theme) => ({
  buttonWrapper: {
    textAlign: 'right',
    padding: 10
  }
}))

const getTitle = (register) => {
  if (register && register.dates.length > 0) {
    return moment(register.dates[0]).format('Y/M/D')
  }
}

function Edit(props) {
  const classes = useStyles()
  const id = props.match.params.id

  const [register, setRegister] = useState(null)
  const [title, setTitle] = useState(null)

  useEffect(() => {
    const getRegister = async (id) => {
      const register = await FirebaseService.getRegister(id)

      if (register && register.dates.length > 0) {
        const date = moment(register.dates[0])
        setTitle(date.format('Y/M/D'))
      }

      setRegister(register)
    }
    getRegister(id)
  }, [])

  return (
    <Grid item xs={12}>
      <Card>
        <CardContent>
          <Typography variant="subtitle1">{title}</Typography>
          {register &&
            register.dates.map((register, index) => {
              return (
                <KeyboardTimePicker
                  margin="normal"
                  id="time-picker"
                  label={index % 2 === 0 ? 'In' : 'Out'}
                  value={register}
                />
              )
            })}
        </CardContent>
        <Divider />
        <div className={classes.buttonWrapper}>
          <Button variant="contained" color="primary" position="right">
            Save
          </Button>
        </div>
      </Card>
    </Grid>
  )
}

export default Edit
