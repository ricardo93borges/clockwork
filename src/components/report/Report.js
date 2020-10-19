import React, { useState, useEffect } from 'react'
import { format, subDays, addDays, differenceInHours } from 'date-fns'
import { Card, CardContent, Grid } from '@material-ui/core'
import { KeyboardDatePicker } from '@material-ui/pickers'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import FirebaseService from '../../services/firebase'

function Report() {
  const date = new Date()
  const [registers, setRegisters] = useState([])
  const [startDate, setStartDate] = useState(subDays(date, 1))
  const [endDate, setEndDate] = useState(date)
  const [startMaxDate, setStartMaxDate] = useState(subDays(date, 1))
  const [endMinDate, setEndMinDate] = useState(date)

  useEffect(() => {
    async function getRegistersByDate(startDate, endDate) {
      const registers = await FirebaseService.getRegistersByDate(startDate, endDate)
      setRegisters(registers)
    }
    getRegistersByDate(startDate, endDate)
  }, [startDate, endDate])

  const handleStartDateChange = (value) => {
    const date = new Date(value)
    setStartDate(date)
    setEndMinDate(addDays(date, 1))
  }

  const handleEndDateChange = (value) => {
    const date = new Date(value)
    setEndDate(date)
    setStartMaxDate(subDays(new Date(value), 1))
  }

  const sumTime = (registers) => {
    if (registers.length % 2 !== 0) {
      return 0
    }

    let time = 0
    let i = 0
    while (i < registers.length) {
      const leftDate = new Date(registers[i])
      const rightDate = new Date(registers[i + 1])
      time += Math.abs(differenceInHours(leftDate, rightDate))
      i += 2
    }
    return time
  }

  return (
    <>
      <Grid item xs={12}>
        <Card>
          <CardContent>
            <Grid item container direction="row" justify="space-around">
              <Grid item xs={5}>
                <KeyboardDatePicker
                  margin="normal"
                  label="Start date"
                  format="M/d/Y"
                  maxDate={startMaxDate}
                  value={startDate}
                  onChange={(date, value) => handleStartDateChange(value)}
                />
              </Grid>
              <Grid item xs={5}>
                <KeyboardDatePicker
                  margin="normal"
                  label="End date"
                  format="M/d/Y"
                  minDate={endMinDate}
                  value={endDate}
                  onChange={(date, value) => handleEndDateChange(value)}
                />
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      </Grid>
      <Grid item xs={12}>
        <Card>
          <CardContent>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Day</TableCell>
                  <TableCell>Time</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {registers &&
                  registers.map((register) => (
                    <TableRow key={register.id}>
                      <TableCell>
                        {format(new Date(register.date), 'MM/dd/yyyy')}
                      </TableCell>
                      <TableCell>{`${sumTime(register.registers)}h`}</TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </Grid>
    </>
  )
}

export default Report
