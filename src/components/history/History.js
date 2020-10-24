import React, { useEffect, useState } from 'react'
import { Card, CardContent, Grid } from '@material-ui/core'
import HistoryItem from './HistoryItem'
import * as FirebaseService from '../../services/firebase'

function History() {
  const [registers, setRegisters] = useState([])

  useEffect(() => {
    FirebaseService.getRegisters((values) => {
      setRegisters(values)
    })
  }, [])

  return (
    <Grid item xs={12}>
      <Card>
        <CardContent>
          {registers.map((register) => (
            <HistoryItem register={register} key={register.id} />
          ))}
        </CardContent>
      </Card>
    </Grid>
  )
}

export default History
