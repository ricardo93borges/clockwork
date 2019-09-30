import React from 'react'
import {
  makeStyles,
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Icon,
  SwipeableDrawer,
  List,
  Divider,
  ListItem,
  ListItemText
} from '@material-ui/core'
import { Link } from 'react-router-dom'

const useStyles = makeStyles((theme) => ({
  menuButton: {
    marginRight: theme.spacing(2)
  },
  title: {
    flexGrow: 1
  },
  list: {
    width: 250
  }
}))

function Menu() {
  const classes = useStyles()

  const [state, setState] = React.useState({
    left: false
  })

  const toggleDrawer = (open) => (event) => {
    if (
      event &&
      event.type === 'keydown' &&
      (event.key === 'Tab' || event.key === 'Shift')
    ) {
      return
    }

    setState({ ...state, left: open })
  }

  return (
    <>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            onClick={toggleDrawer(true)}
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="menu"
          >
            <Icon>menu</Icon>
          </IconButton>
          <Typography variant="h6" className={classes.title}>
            Clockwork
          </Typography>
        </Toolbar>
      </AppBar>

      <SwipeableDrawer
        open={state.left}
        onClose={toggleDrawer(false)}
        onOpen={toggleDrawer(true)}
      >
        <div
          className={classes.list}
          role="presentation"
          onClick={toggleDrawer('left', false)}
          onKeyDown={toggleDrawer('left', false)}
        >
          <List>
            <ListItem button key={'report'}>
              <ListItemText primary={'Report'} />
            </ListItem>
          </List>
          <Divider />
          <List>
            <ListItem button key={'logout'}>
              <ListItemText primary={'Logout'} />
            </ListItem>
          </List>
        </div>
      </SwipeableDrawer>
    </>
  )
}

export default Menu
