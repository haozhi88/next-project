/* Import package components */
import React from "react";
import {
  Box,
  Card,
  CardHeader,
  CardContent,
  makeStyles,
  Typography
} from "@material-ui/core";
import Avatar from "@material-ui/core/Avatar";
import Rating from "@material-ui/lab/Rating";
import Divider from "@material-ui/core/Divider";
import { observer } from "mobx-react";

/* Import app components */
import useStores from "../hooks/useStores";

/* CSS Styles */
const ContainerStyles = {
  width: "100%"
};

const useStyles = makeStyles(theme => ({
  card: {
    maxWidth: 345
  },
  media: {
    height: 0,
    paddingTop: "56.25%" // 16:9
  },
  expand: {
    transform: "rotate(0deg)",
    marginLeft: "auto",
    transition: theme.transitions.create("transform", {
      duration: theme.transitions.duration.shortest
    })
  },
  expandOpen: {
    transform: "rotate(180deg)"
  },
  bigAvatar: {
    width: 240,
    height: 240
  }
}));

function ProfilePage() {
  const classes = useStyles();
  const {
    userStore: { currentUser }
  } = useStores();
  const learnRating = 5;
  const teachRating = 5;
  const skills = currentUser.skills;
  return (
    <>
      <div style={ContainerStyles}>
        <Card>
          {/* <CardMedia
            className={classes.media}
            image="http://nextagram-lee.s3.amazonaws.com/ironman.jpg"
            title="Name"
          /> */}
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              paddingTop: "10px",
              paddingBottom: "10px"
              // backgroundColor: "#C2DFFF"
            }}
          >
            {/* <Avatar
              alt="Lee"
              src="http://nextagram-lee.s3.amazonaws.com/ironman.jpg"
              className={classes.bigAvatar}
            /> */}
            <Avatar
              alt={currentUser.name}
              src={currentUser.profile_picture}
              className={classes.bigAvatar}
            />
          </div>
          <CardHeader
            style={{ textAlign: "center" }}
            title={currentUser.name}
          />
          <CardContent style={{ color: "#393333", padding: 0 }}>
            {/* <Divider variant="middle"/> */}
            <Typography variant="subtitle1" component="p" align="center">
              <strong>Learning Rating</strong>
            </Typography>
            <Box component="fieldset" borderColor="transparent">
              <Rating name="read-only" value={learnRating} readOnly />
            </Box>
            <Typography variant="subtitle1" component="p" align="center">
              <strong>Teaching Rating</strong>
            </Typography>
            <Box component="fieldset" borderColor="transparent">
              <Rating name="read-only" value={teachRating} readOnly />
            </Box>
          </CardContent>
          <Divider variant="middle" />
          <CardContent style={{ color: "#393333" }}>
            <Typography variant="caption" component="p" align="left">
              <strong>Email:</strong>
            </Typography>
            <Typography variant="h6" component="p" align="left">
              {currentUser.email}
            </Typography>
          </CardContent>
          <Divider variant="middle" />
          <CardContent style={{ color: "#393333" }}>
            <Typography variant="caption" component="p" align="left">
              <strong>Skills:</strong>
            </Typography>
            <Typography variant="h6" component="p" align="left">
              {skills}
            </Typography>
          </CardContent>
        </Card>
      </div>
    </>
  );
}

export default observer(ProfilePage);
