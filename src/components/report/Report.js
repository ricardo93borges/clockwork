import React, { useEffect, useState } from 'react'
import { Card, CardContent, Grid } from '@material-ui/core'
import { KeyboardDatePicker } from '@material-ui/pickers'
import FirebaseService from '../../services/firebase'
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

function Report() {
  const [startDate, setStartDate] = useState(new Date())
  const [endDate, setEndDate] = useState(new Date())
  const [startMaxDate, setStartMaxDate] = useState(new Date())
  const [endMinDate, setEndMinDate] = useState(new Date())

  return (
    <>
      <Grid item xs={12}>
        <Card>
          <CardContent>
            <Grid item container direction="row" justify="space-around">
              <Grid item xs={5}>
                <KeyboardDatePicker
                  margin="normal"
                  id="time-picker"
                  label="Start date"
                  format="M/D/Y"
                  maxDate={startMaxDate}
                  value={startDate}
                  onChange={(date, value) => {
                    console.log(date)
                    console.log(value)
                  }}
                />
              </Grid>
              <Grid item xs={5}>
                <KeyboardDatePicker
                  margin="normal"
                  id="time-picker"
                  label="End date"
                  format="M/D/Y"
                  minDate={endMinDate}
                  value={endDate}
                  onChange={(date, value) => {
                    console.log(date)
                    console.log(value)
                  }}
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
                <TableRow>
                  <TableCell>{'11/10/2020'}</TableCell>
                  <TableCell>{'8h'}</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </Grid>
    </>
  )
}

export default Report