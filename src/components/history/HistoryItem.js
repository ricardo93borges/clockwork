import React from 'react'
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

const useStyles = makeStyles((theme) => ({
  item: {
    marginBottom: 20
  },
  edit: {
    cursor: 'pointer'
  }
}))

function HistoryItem({ row, date, index }) {
  const classes = useStyles()
  return (
    <div className={classes.item}>
      <Grid container>
        <Grid item xs={11}>
          <Typography variant="subtitle1">{date}</Typography>
        </Grid>
        <Grid item xs={1} className={classes.edit}>
          <Link to={`/register/edit/${index}`}>
            <Icon color={'primary'} position="right">
              edit
            </Icon>
          </Link>
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
          <TableRow key={index}>
            <TableCell>{row[0]}</TableCell>
            <TableCell>{row[1]}</TableCell>
            <TableCell>{row[2]}</TableCell>
            <TableCell>{row[3]}</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </div>
  )
}

export default HistoryItem
