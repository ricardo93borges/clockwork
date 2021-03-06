import React, { useState, useEffect } from 'react'
import { format } from 'date-fns'
import {
  Grid,
  Card,
  CardContent,
  Typography,
  Button,
  Divider,
  Icon
} from '@material-ui/core'
import { KeyboardTimePicker } from '@material-ui/pickers'
import * as FirebaseService from '../../services/firebase'
import { useStyles } from '../../style/style'

function Edit(props) {
  const { buttonWrapper, deleteBtn, saveBtn, card } = useStyles()
  const id = props.match.params.id

  const [register, setRegister] = useState(null)
  const [title, setTitle] = useState(null)
  const [originalDate, setOriginalDate] = useState(null)

  useEffect(() => {
    const getRegister = async (id) => {
      const register = await FirebaseService.getRegister(id)

      if (register && register.registers.length > 0) {
        setOriginalDate(register.date)
        setTitle(format(new Date(register.date), 'MM/dd/yyyy'))
      }

      setRegister(register)
    }
    getRegister(id)
  }, [id])

  const remove = (index) => {
    const r = Object.assign({}, register)
    r.registers.splice(index, 1)
    setRegister(r)
  }

  const add = () => {
    if (register.registers.length >= 4) return
    const r = Object.assign({}, register)
    r.registers.push(new Date())
    setRegister(r)
  }

  const updateDate = (index, date, value) => {
    const r = Object.assign({}, register)

    let str = `${originalDate.getFullYear()}/
      ${originalDate.getMonth() + 1}/
      ${originalDate.getDate()} ${format(new Date(date), 'H:m')}`

    let newDate = new Date(str)

    r.registers[index] = newDate
    setRegister(r)
  }

  const updateRegister = async (register) => {
    await FirebaseService.updateRegister(register.id, register)
    props.history.goBack()
  }

  return (
    <Grid item xs={12} className={card}>
      <Card>
        <CardContent>
          <Typography variant="subtitle1">{title}</Typography>
          {register &&
            register.registers.map((date, index) => {
              return (
                <Grid item key={index} xs={12}>
                  <KeyboardTimePicker
                    margin="normal"
                    label={index % 2 === 0 ? 'In' : 'Out'}
                    value={date}
                    onChange={(date, value) => updateDate(index, date, value)}
                  />
                  <Icon
                    color={'primary'}
                    position="right"
                    className={deleteBtn}
                    onClick={() => remove(index)}
                  >
                    delete
                  </Icon>
                </Grid>
              )
            })}
        </CardContent>
        <Divider />
        <div className={buttonWrapper}>
          <Button variant="contained" color="primary" onClick={() => add()}>
            Add
          </Button>
          <Button
            variant="contained"
            color="primary"
            className={saveBtn}
            onClick={() => updateRegister(register)}
          >
            Save
          </Button>
        </div>
      </Card>
    </Grid>
  )
}

export default Edit
