import React from 'react'
import * as moment from 'moment'
import {
  makeStyles,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Icon,
  Grid
} from '@material-ui/core'
import { Link } from 'react-router-dom'
import FirebaseService from '../../services/firebase'

moment.locale('pt-br')

const useStyles = makeStyles((theme) => ({
  item: {
    marginBottom: 20
  },
  edit: {
    cursor: 'pointer',
    marginRight: '15px'
  },
  delete: {
    cursor: 'pointer'
  }
}))

function HistoryItem({ register }) {
  const classes = useStyles()
  const date = moment(register.date)

  return (
    <div className={classes.item}>
      <Grid container>
        <Grid item xs={9}>
          <Typography variant="subtitle1">{date.format('Y/M/D')}</Typography>
        </Grid>
        <Grid item xs={1} className={classes.edit}>
          <Link to={`/register/edit/${register.id}`}>
            <Icon color={'primary'} position="right">
              edit
            </Icon>
          </Link>
        </Grid>
        <Grid item xs={1} className={classes.edit}>
          <Icon
            color={'primary'}
            position="right"
            className={classes.delete}
            onClick={() => FirebaseService.delete(register.id)}
          >
            delete
          </Icon>
        </Grid>
      </Grid>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell align={'center'}>In</TableCell>
            <TableCell align={'center'}>Out</TableCell>
            <TableCell align={'center'}>In</TableCell>
            <TableCell align={'center'}>Out</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          <TableRow>
            {register.registers.map((date, index) => (
              <TableCell key={index}>{moment(date).format('H:m')}</TableCell>
            ))}
          </TableRow>
        </TableBody>
      </Table>
    </div>
  )
}

export default HistoryItem
