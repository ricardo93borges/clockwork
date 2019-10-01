import React, { useState, useEffect } from 'react'
import * as moment from 'moment'
import {
  Grid,
  Card,
  CardContent,
  Typography,
  Button,
  Divider,
  Icon,
  makeStyles
} from '@material-ui/core'
import { KeyboardTimePicker } from '@material-ui/pickers'
import FirebaseService from '../../services/firebase'

const useStyles = makeStyles((theme) => ({
  buttonWrapper: {
    padding: 10
  },
  deleteBtn: {
    float: 'right',
    marginTop: 30,
    cursor: 'pointer'
  },
  saveBtn: {
    float: 'right'
  }
}))

function Edit(props) {
  const classes = useStyles()
  const id = props.match.params.id

  const [register, setRegister] = useState(null)
  const [title, setTitle] = useState(null)
  const [originalDate, setOriginalDate] = useState(null)

  useEffect(() => {
    const getRegister = async (id) => {
      const register = await FirebaseService.getRegister(id)

      if (register && register.dates.length > 0) {
        const date = moment(register.dates[0])
        setOriginalDate(register.dates[0])
        setTitle(date.format('Y/M/D'))
      }

      setRegister(register)
    }
    getRegister(id)
  }, [])

  const remove = (index) => {
    const r = Object.assign({}, register)
    r.dates.splice(index, 1)
    setRegister(r)
  }

  const add = () => {
    if (register.dates.length >= 4) return
    const r = Object.assign({}, register)
    r.dates.push(new Date())
    setRegister(r)
  }

  const updateDate = (index, date, value) => {
    const r = Object.assign({}, register)

    let str = `${originalDate.getFullYear()}/
      ${originalDate.getMonth() + 1}/
      ${originalDate.getDate()} ${date.format('H:m')}`

    let newDate = new Date(str)

    r.dates[index] = newDate
    setRegister(r)
  }

  return (
    <Grid item xs={12}>
      <Card>
        <CardContent>
          <Typography variant="subtitle1">{title}</Typography>
          {register &&
            register.dates.map((date, index) => {
              return (
                <Grid item key={index} xs={12}>
                  <KeyboardTimePicker
                    margin="normal"
                    id="time-picker"
                    label={index % 2 === 0 ? 'In' : 'Out'}
                    value={date}
                    onChange={(date, value) => updateDate(index, date, value)}
                  />
                  <Icon
                    color={'primary'}
                    position="right"
                    className={classes.deleteBtn}
                    onClick={() => remove(index)}
                  >
                    delete
                  </Icon>
                </Grid>
              )
            })}
        </CardContent>
        <Divider />
        <div className={classes.buttonWrapper}>
          <Button variant="contained" color="primary" onClick={() => add()}>
            Add
          </Button>
          <Button
            variant="contained"
            color="primary"
            className={classes.saveBtn}
            onClick={() => FirebaseService.updateRegister(register.id, register)}
          >
            Save
          </Button>
        </div>
      </Card>
    </Grid>
  )
}

export default Edit
