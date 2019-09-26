import React from 'react';
import * as moment from 'moment';
import { Card, CardContent, Grid } from '@material-ui/core'
import HistoryItem from './HistoryItem';

moment.locale('pt-br')

const dates = [
  {id:1, date:'2019-09-26T09:00:59.741Z'},
  {id:2, date:'2019-09-26T12:00:59.741Z'},
  {id:3, date:'2019-09-26T13:00:59.741Z'},
  {id:4, date:'2019-09-26T18:00:59.741Z'},
  {id:5, date:'2019-09-27T09:00:59.741Z'},
  {id:6, date:'2019-09-27T12:00:59.741Z'},
  {id:7, date:'2019-09-27T13:00:59.741Z'},
  {id:8, date:'2019-09-27T18:00:59.741Z'},
]

function setRows(dates) {
  let rows = {}
  
  dates.forEach(el => {
    let d = moment(el.date)
    let id = `${d.year()}/${d.month()}/${d.day()}`
    let time = `${d.format('HH')}:${d.format('mm')}`

    if(rows.hasOwnProperty(id)){
      rows[id].push(time)
    }else{
      rows[id] = [time]
    }
  });

  return rows
}

function History() {
  const rows = setRows(dates);

  return (
    <Grid item xs={12}>
      <Card>
          <CardContent>              
              { Object.keys(rows).map( (date, index) => <HistoryItem row={rows[date]} date={date} index={index} /> )}              
          </CardContent>
      </Card>
    </Grid>
  );
}

export default History;
