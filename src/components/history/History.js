import React, { useEffect, useState } from 'react'
import { Card, CardContent, Grid } from '@material-ui/core'
import HistoryItem from './HistoryItem'
import * as FirebaseService from '../../services/firebase'
import useDateFilter from '../date-filter/DateFilter'

function History() {
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

  return (
    <>
      <Grid item xs={12}>
        <DateFilter />
      </Grid>
      <Grid item xs={12}>
        <Card>
          <CardContent>
            {registers.map((register) => (
              <HistoryItem register={register} key={register.id} />
            ))}
          </CardContent>
        </Card>
      </Grid>
    </>
  )
}

export default History
