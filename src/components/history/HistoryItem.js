import React from 'react'
import { format } from 'date-fns'
import {
  makeStyles,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Grid,
  Menu,
  IconButton,
  MenuItem
} from '@material-ui/core'
import MoreVertIcon from '@material-ui/icons/MoreVert'
import { Link } from 'react-router-dom'
import * as FirebaseService from '../../services/firebase'

const useStyles = makeStyles((theme) => ({
  item: {
    marginBottom: 30
  },
  menuItem: {
    cursor: 'pointer',
    marginRight: '15px',
    textDecoration: 'none',
    color: '#000'
  },
  moreMenuButton: {
    padding: 0
  }
}))

function HistoryItem({ register }) {
  const classes = useStyles()
  const [anchorElement, setAnchorEl] = React.useState(null)

  const open = Boolean(anchorElement)
  const date = new Date(register.date)

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  const handleDelete = () => {
    FirebaseService.deleteRegister(register.id)
    handleClose()
  }

  return (
    <div className={classes.item}>
      <Grid container>
        <Grid item xs={11}>
          <Typography variant="subtitle1">{format(date, 'MM/dd/yyyy')}</Typography>
        </Grid>
        <Grid item xs={1}>
          <IconButton
            className={classes.moreMenuButton}
            aria-label="more"
            aria-controls="long-menu"
            aria-haspopup="true"
            onClick={handleClick}
          >
            <MoreVertIcon />
          </IconButton>
          <Menu
            id="long-menu"
            anchorEl={anchorElement}
            keepMounted
            open={open}
            onClose={handleClose}
            PaperProps={{
              style: {
                maxHeight: 48 * 4.5,
                width: '20ch'
              }
            }}
          >
            <MenuItem key="edit" onClick={handleClose}>
              <Link
                to={`/register/edit/${register.id}`}
                className={classes.menuItem}
              >
                Edit
              </Link>
            </MenuItem>
            <MenuItem
              key="delete"
              onClick={handleDelete}
              className={classes.menuItem}
            >
              Delete
            </MenuItem>
          </Menu>
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
              <TableCell key={index}>{format(new Date(date), 'H:m')}</TableCell>
            ))}
          </TableRow>
        </TableBody>
      </Table>
    </div>
  )
}

export default HistoryItem
