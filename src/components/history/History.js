import React, { useEffect, useState } from 'react'
import * as moment from 'moment'
import { Card, CardContent, Grid } from '@material-ui/core'
import HistoryItem from './HistoryItem'
import FirebaseService from '../../services/firebase'

moment.locale('pt-br')

function formatRows(dates) {
  let rows = {}

  dates.forEach((el) => {
    let d = moment(el.date)
    let id = d.format('Y/M/D')
    let time = `${d.format('HH')}:${d.format('mm')}`

    if (rows.hasOwnProperty(id)) {
      rows[id].push(time)
    } else {
      rows[id] = [time]
    }
  })

  return rows
}

function History() {
  const [rows, setRows] = useState([])

  useEffect(() => {
    FirebaseService.getRegisters((values) => {
      setRows(formatRows(values))
    })
  }, [])

  return (
    <Grid item xs={12}>
      <Card>
        <CardContent>
          {Object.keys(rows).map((date, index) => (
            <HistoryItem row={rows[date]} date={date} index={index} key={index} />
          ))}
        </CardContent>
      </Card>
    </Grid>
  )
}

export default History
