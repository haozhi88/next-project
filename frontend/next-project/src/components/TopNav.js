/* Import package components */
import React, { useState } from "react";
import {
  AppBar,
  Toolbar,
  Avatar,
  IconButton,
  SwipeableDrawer,
  Grid,
  List,
  ListSubheader,
  ListItem,
  ListItemIcon,
  ListItemText
} from "@material-ui/core";
import { Menu } from "@material-ui/icons";
import MenuBookIcon from "@material-ui/icons/MenuBook";
import InboxIcon from "@material-ui/icons/Inbox";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import BookmarkIcon from "@material-ui/icons/Bookmark";
import PeopleIcon from "@material-ui/icons/People";
import EventIcon from "@material-ui/icons/Event";
import SettingsIcon from "@material-ui/icons/Settings";
import InfoIcon from "@material-ui/icons/Info";
import { route } from "../global";

/* Import app components */
import DialogPage from "../components/DialogPage";
import useStores from "../hooks/useStores";
import { makeStyles } from "@material-ui/styles";

const iconColor = {
  color: "#5CB3FF",
  fontSize: "35px"
};

const backGround = {
  color: "#C2DFFF"
};

const useStyles = makeStyles(theme => ({
  bigAvatar: {
    width: 80,
    height: 80
  }
}));

export default function TopNav() {
  const {
    userStore: { currentUser, logout }
  } = useStores();
  const [open, setOpen] = useState(false);
  const [routeArgs, setRouteArgs] = useState([]);
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
  const classes = useStyles();
  //profile picture if currentUser loggedIn
  function profilePicture() {
    if (currentUser.loggedIn) {
      return [
        <ListSubheader
          component="div"
          id="nested-list-subheader"
          style={backGround}
        >
          <ListItem button>
            <ListItemIcon>
              <Avatar
                id={currentUser.id}
                src={currentUser.profile_picture}
                className={classes.bigAvatar}
              />
            </ListItemIcon>
            <ListItemText
              style={{ color: "#393333", fontSize: "14px", margin: "15px" }}
            >
              {currentUser.name}
            </ListItemText>
          </ListItem>
        </ListSubheader>
      ];
    } else {
      return [
        <ListSubheader
          component="div"
          id="nested-list-subheader"
          style={backGround}
        >
          <ListItem button>
            <ListItemIcon>
              <AccountCircleIcon
                style={{ fontSize: "88px", color: "#1589FF" }}
              />
            </ListItemIcon>
            <ListItemText
              style={{ color: "#393333", fontSize: "14px", margin: "15px" }}
            >
              Username
            </ListItemText>
          </ListItem>
        </ListSubheader>
      ];
    }
  }

  //sign in button if currentUser logged in
  function signInButton() {
    if (currentUser.loggedIn) {
      return [
        <ListItem
          button
          onClick={() => {
            localStorage.removeItem("userToken");
            localStorage.removeItem("userData");
            console.log("sign out successfully");
            logout();
          }}
        >
          <ListItemIcon>
            <ExitToAppIcon style={iconColor} />
          </ListItemIcon>
          <ListItemText style={{ color: "#393333", fontSize: "14px" }}>
            Sign Out
          </ListItemText>
        </ListItem>
      ];
    } else {
      return [
        <ListItem button onClick={() => routeTo(route.signinPage)}>
          <ListItemIcon>
            <ExitToAppIcon style={iconColor} />
          </ListItemIcon>
          <ListItemText style={{ color: "#393333", fontSize: "14px" }}>
            Sign Up / Login
          </ListItemText>
        </ListItem>
      ];
    }
  }
  return (
    <>
      <AppBar position="static" style={{ backgroundColor: "#1589FF" }}>
        <Toolbar>
          <IconButton color="inherit" onClick={() => setOpen(!open)}>
            <Menu style={{ fontSize: "30px" }} />
          </IconButton>
          <div style={{ flexGrow: 1 }} />
          {/* <Avatar onClick={() => routeTo(route.profilePage)}>S</Avatar> */}
          <IconButton
            color="inherit"
            onClick={() => routeTo(route.profilePage)}
          >
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
          <br />
          <br />
          <br />
          <Grid container direction="column">
            <List
              component="nav"
              aria-labelledby="nested-list-subheader"
              subheader={profilePicture()}
            >
              <br />
              {signInButton()}
              <ListItem button onClick={() => routeTo(route.learnListPage)}>
                <ListItemIcon>
                  <MenuBookIcon style={iconColor} />
                </ListItemIcon>
                <ListItemText style={{ color: "#393333", fontSize: "14px" }}>
                  Lesson
                </ListItemText>
              </ListItem>
              <ListItem button onClick={() => routeTo(route.teachListPage)}>
                <ListItemIcon>
                  <PeopleIcon style={iconColor} />
                </ListItemIcon>
                <ListItemText style={{ color: "#393333", fontSize: "14px" }}>
                  Teach
                </ListItemText>
              </ListItem>
              <ListItem button onClick={() => routeTo(route.eventListPage)}>
                <ListItemIcon>
                  <EventIcon style={iconColor} />
                </ListItemIcon>
                <ListItemText style={{ color: "#393333", fontSize: "14px" }}>
                  Events
                </ListItemText>
              </ListItem>
              <ListItem button onClick={() => routeTo(route.bookmarkListPage)}>
                <ListItemIcon>
                  <BookmarkIcon style={iconColor} />
                </ListItemIcon>
                <ListItemText style={{ color: "#393333", fontSize: "14px" }}>
                  Bookmark List
                </ListItemText>
              </ListItem>
              <ListItem button onClick={() => routeTo(route.inboxListPage)}>
                <ListItemIcon>
                  <InboxIcon style={iconColor} />
                </ListItemIcon>
                <ListItemText style={{ color: "#393333", fontSize: "14px" }}>
                  Inbox
                </ListItemText>
              </ListItem>
              <ListItem button>
                <ListItemIcon>
                  <SettingsIcon style={iconColor} />
                </ListItemIcon>
                <ListItemText style={{ color: "#393333", fontSize: "14px" }}>
                  Settings
                </ListItemText>
              </ListItem>
              <ListItem button onClick={() => routeTo(route.versionPage)}>
                <ListItemIcon>
                  <InfoIcon style={iconColor} />
                </ListItemIcon>
                <ListItemText style={{ color: "#393333", fontSize: "14px" }}>
                  About Us
                </ListItemText>
              </ListItem>
            </List>
          </Grid>
        </SwipeableDrawer>
      </AppBar>
      <DialogPage
        routeTo={routeTo}
        routeOption={routeOption}
        routeArgs={routeArgs}
        dialogOpen={dialogOpen}
      />
    </>
  );
}
