import React from 'react'
import { withRouter } from 'react-router-dom'
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
  ListItemText,
  ListItemIcon
} from '@material-ui/core'

const useStyles = makeStyles((theme) => ({
  menuButton: {
    marginRight: theme.spacing(2)
  },
  title: {
    flexGrow: 1
  },
  list: {
    width: 250,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between'
  }
}))

function Menu(props) {
  const { list, title, menuButton } = useStyles()

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
            className={menuButton}
            color="inherit"
            aria-label="menu"
          >
            <Icon>menu</Icon>
          </IconButton>
          <Typography variant="h6" className={title}>
            Clockwork
          </Typography>
        </Toolbar>
      </AppBar>

      <SwipeableDrawer
        open={state.left}
        onClose={toggleDrawer(false)}
        onOpen={toggleDrawer(true)}
      >
        <div className={list} role="presentation">
          <List>
            <ListItem button key={'home'} onClick={() => props.history.push('/')}>
              <ListItemIcon>
                <Icon>home</Icon>
              </ListItemIcon>
              <ListItemText primary={'Home'} />
            </ListItem>
            <ListItem button key={'report'} onClick={() => props.history.push('/')}>
              <ListItemIcon>
                <Icon>show_chart</Icon>
              </ListItemIcon>
              <ListItemText primary={'Report'} />
            </ListItem>
          </List>
          <Divider />
          <List>
            <ListItem button key={'logout'} onClick={() => props.history.push('/')}>
              <ListItemIcon>
                <Icon>exit_to_app</Icon>
              </ListItemIcon>
              <ListItemText primary={'Logout'} />
            </ListItem>
          </List>
        </div>
      </SwipeableDrawer>
    </>
  )
}

export default withRouter(Menu)
