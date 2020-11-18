import React, { useState, useEffect } from 'react'
import { format, differenceInMinutes } from 'date-fns'
import { Card, CardContent, Grid } from '@material-ui/core'
import { Link } from 'react-router-dom'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import EditIcon from '@material-ui/icons/Edit'
import * as FirebaseService from '../../services/firebase'
import useDateFilter from '../date-filter/DateFilter'
import { useStyles } from '../../style/style'

function Report() {
  const { card } = useStyles()
  const [registers, setRegisters] = useState([])
  const { DateFilter, startDate, endDate } = useDateFilter()

  useEffect(() => {
    async function getRegistersByDate(startDate, endDate) {
      await FirebaseService.getRegistersByDate(startDate, endDate, (registers) => {
        setRegisters(registers)
      })
    }

    getRegistersByDate(startDate, endDate)
  }, [startDate, endDate])

  const sumTime = (registers) => {
    if (registers.length % 2 !== 0) {
      return 0
    }

    let time = 0
    let i = 0
    while (i < registers.length) {
      const leftDate = new Date(registers[i])
      const rightDate = new Date(registers[i + 1])
      time += Math.abs(differenceInMinutes(leftDate, rightDate))
      i += 2
    }
    return (time / 60).toFixed(2)
  }

  return (
    <>
      <Grid item xs={12} className={card}>
        <DateFilter />
      </Grid>
      <Grid item xs={12} className={card}>
        <Card>
          <CardContent>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Day</TableCell>
                  <TableCell>Time</TableCell>
                  <TableCell></TableCell>
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
                      <TableCell style={{ textAlign: 'center' }}>
                        <Link to={`/register/edit/${register.id}`}>
                          <EditIcon />
                        </Link>
                      </TableCell>
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
