import React from 'react';
import { 
  makeStyles, 
  Typography, 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableRow 
} from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  item: {
    marginBottom: 20
  }
}));

function HistoryItem({row, date, index}) {
  const classes = useStyles();
  return (
    <div className={classes.item}>
      <Typography variant='subtitle1'>{ date }</Typography>
      <Table size='small'>
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
            <TableCell>{ row[0] }</TableCell>
            <TableCell>{ row[1] }</TableCell>
            <TableCell>{ row[2] }</TableCell>
            <TableCell>{ row[3] }</TableCell>
          </TableRow>                     
        </TableBody>
      </Table>
    </div>
  );
}

export default HistoryItem;
