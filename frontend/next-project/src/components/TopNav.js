/* Import package components */
import React, { useState } from "react";
import {
  AppBar,
  Toolbar,
  Avatar,
  IconButton,
  SwipeableDrawer,
  Grid,
  List, ListSubheader, ListItem, ListItemIcon, ListItemText
} from "@material-ui/core";
import { Menu } from "@material-ui/icons";
import MenuBookIcon from '@material-ui/icons/MenuBook';
import InboxIcon from '@material-ui/icons/Inbox';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import BookmarkIcon from '@material-ui/icons/Bookmark';
import PeopleIcon from '@material-ui/icons/People';
import EventIcon from '@material-ui/icons/Event';
import SettingsIcon from '@material-ui/icons/Settings';
import InfoIcon from '@material-ui/icons/Info';
import { route } from "../global";

/* Import app components */
import DialogPage from "../components/DialogPage";

const iconColor ={
  color: '#5CB3FF',
  fontSize: '35px'
}

const backGround ={
  color: '#C2DFFF'
}

export default function TopNav() {
  const [open, setOpen] = useState(false);
  const [routeOption, setRouteOption] = useState(route.close);
  const [dialogOpen, setDialogOpen] = useState(false);
  const routeTo = option => {
    if (option === route.close) {
      setDialogOpen(false);
    } else {
      setDialogOpen(true);
    }
    setRouteOption(option);
  };

  return (
    <>
      <AppBar position="static" style={{ backgroundColor: "#1589FF"}}>
        <Toolbar>
          <IconButton color="inherit" onClick={() => setOpen(!open)}>
            <Menu style={{ fontSize: "30px" }}  />
          </IconButton>
          <div style={{ flexGrow: 1 }} />
          {/* <Avatar onClick={() => routeTo(route.profilePage)}>S</Avatar> */}
                    <IconButton color="inherit" onClick={() => routeTo(route.profilePage)}>
            <AccountCircleIcon style={{ fontSize: "33px" }} />
          </IconButton>
        </Toolbar>
        <SwipeableDrawer
          open={open}
          onClose={() => setOpen(false)}
          onOpen={() => setOpen(true)}
          disableSwipeToOpen={false}
          PaperProps={{ style: { minWidth: "65vw" } }}
        >
          {/* <h4>Menu</h4> */}
          <br /><br /><br />
          <Grid container direction="column">
          <List component="nav" aria-labelledby="nested-list-subheader"
            subheader={
              <ListSubheader component="div" id="nested-list-subheader" style={backGround} >
                <ListItem button >
                  <ListItemIcon>
                    <AccountCircleIcon style={{ fontSize: "88px" , color: "#1589FF" }}/>
                  </ListItemIcon>
                  <ListItemText  secondary="Login/Signup" />
              </ListItem>
              </ListSubheader>
          }>
            <br />
            <ListItem button onClick={() => routeTo(route.signinPage)}>
                <ListItemIcon>
                  <ExitToAppIcon style={iconColor}/>
                </ListItemIcon>
                <ListItemText secondary="Login/Signup" />
              </ListItem>
              <ListItem button onClick={() => routeTo(route.learnListPage)}>
                <ListItemIcon>
                  <MenuBookIcon style={iconColor}/>
                </ListItemIcon>
                <ListItemText secondary="Lesson" />
              </ListItem>
              <ListItem button onClick={() => routeTo(route.teachListPage)}>
                <ListItemIcon>
                  <PeopleIcon style={iconColor}/>
                </ListItemIcon>
                <ListItemText secondary="Teach" />
              </ListItem>
              <ListItem button onClick={() => routeTo(route.eventListPage)}>
                <ListItemIcon>
                  <EventIcon style={iconColor} />
                </ListItemIcon>
                <ListItemText secondary="Event" />
              </ListItem>
              <ListItem button onClick={() => routeTo(route.bookmarkListPage)}>
                <ListItemIcon>
                  <BookmarkIcon style={iconColor}/>
                </ListItemIcon>
                <ListItemText secondary="Bookmark List" />
              </ListItem>
              <ListItem button onClick={() => routeTo(route.inboxListPage)}>
                <ListItemIcon>
                  <InboxIcon style={iconColor}/>
                </ListItemIcon>
                <ListItemText secondary="Inbox" />
              </ListItem>
              <ListItem button>
                <ListItemIcon>
                  <SettingsIcon style={iconColor}/>
                </ListItemIcon>
                <ListItemText secondary="Settings" />
              </ListItem>
              <ListItem button>
                <ListItemIcon>
                  <InfoIcon style={iconColor}/>
                </ListItemIcon>
                <ListItemText secondary="About us" />
              </ListItem>         
            </List>
          </Grid>
        </SwipeableDrawer>
      </AppBar>
      <DialogPage
        routeTo={routeTo}
        routeOption={routeOption}
        dialogOpen={dialogOpen}
      />
    </>
  );
}
