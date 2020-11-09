import React, { useState } from 'react'
import { subDays, addDays } from 'date-fns'
import { Card, CardContent, Grid } from '@material-ui/core'
import { KeyboardDatePicker } from '@material-ui/pickers'

function useDateFilter() {
  const date = new Date()
  const [startDate, setStartDate] = useState(subDays(date, 1))
  const [endDate, setEndDate] = useState(date)
  const [startMaxDate, setStartMaxDate] = useState(subDays(date, 1))
  const [endMinDate, setEndMinDate] = useState(date)

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

  function DateFilter() {
    return (
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
    )
  }

  return {
    DateFilter,
    startDate,
    endDate
  }
}

export default useDateFilter
