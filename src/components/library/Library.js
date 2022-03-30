import React from 'react';
import { useAuth } from '../../contexts/AuthContext';

import Search from './Search';
import MyLibrary from './MyLibrary';

import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import AccountBoxIcon from '@material-ui/icons/AccountBox';
import { Switch, Route, Link, BrowserRouter } from 'react-router-dom';
import UpdateProfile from '../accountmanagment/UpdateProfile';
import { useHistory } from 'react-router-dom';

import BlankBook from './utils/BlankBook';

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  appBar: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  // necessary for content to be below app bar
  toolbar: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.default,
    padding: theme.spacing(3),
  },
}));

export default function Library() {
  const classes = useStyles();
  const { currentUser, signout } = useAuth();
  const history = useHistory();

  async function handleLogout() {
    try {
      await signout();
      history.push('/signin');
    } catch {
      console.log('Sign Out Failed');
    }
  }

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar position="fixed" className={classes.appBar}>
        <Toolbar>
          <Typography variant="h6" noWrap>
            Library, Hi {currentUser.email}
          </Typography>
        </Toolbar>
      </AppBar>
      <BrowserRouter>
        <Drawer
          className={classes.drawer}
          variant="permanent"
          classes={{
            paper: classes.drawerPaper,
          }}
          anchor="left"
        >
          <div className={classes.toolbar} />
          <Divider />
          <List>
            <ListItem button key="My Library" component={Link} to="/">
              <ListItemIcon>
                <InboxIcon />
              </ListItemIcon>
              <ListItemText primary="My Library" />
            </ListItem>
            <ListItem button key="Search" component={Link} to="/search">
              <ListItemIcon>
                <InboxIcon />
              </ListItemIcon>
              <ListItemText primary="Search" />
            </ListItem>
            <ListItem
              button
              key="NC Want to Read"
              component={Link}
              to="/blank-book"
            >
              <ListItemIcon>
                <InboxIcon />
              </ListItemIcon>
              <ListItemText primary="NC Want to Read" />
            </ListItem>
            <ListItem button key="NC Read">
              <ListItemIcon>
                <InboxIcon />
              </ListItemIcon>
              <ListItemText primary="NC Read" />
            </ListItem>
          </List>
          <Divider />
          <List>
            <ListItem
              button
              key="Account Details"
              component={Link}
              to="/update-profile"
            >
              <ListItemIcon>
                <AccountBoxIcon />
              </ListItemIcon>
              <ListItemText primary="Account Details" />
            </ListItem>
            <ListItem button key="Sign Out" onClick={handleLogout}>
              <ListItemIcon>
                <ExitToAppIcon />
              </ListItemIcon>
              <ListItemText primary="Sign Out" />
            </ListItem>
          </List>
        </Drawer>
        <main className={classes.content}>
          <div className={classes.toolbar} />
          <Switch>
            <Route exact path="/" render={() => <MyLibrary />} />
            <Route path="/search" render={() => <Search />} />
            <Route path="/update-profile" render={() => <UpdateProfile />} />
            <Route path="/blank-book" render={() => <BlankBook />} />
          </Switch>
        </main>
      </BrowserRouter>
    </div>
  );
}
