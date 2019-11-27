/* Import package components */
import React from "react";
import {
  Box,
  Card,
  CardHeader,
  CardMedia,
  CardContent,
  makeStyles,
  Typography
} from "@material-ui/core";
import Avatar from "@material-ui/core/Avatar";
import Rating from "@material-ui/lab/Rating";

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

export default function ProfilePage() {
  const classes = useStyles();
  const learnRating = 4;
  const teachRating = 4;
  return (
    <>
      <div style={ContainerStyles}>
        <Card>
          {/* <CardMedia
            className={classes.media}
            image="http://nextagram-lee.s3.amazonaws.com/ironman.jpg"
            title="Name"
          /> */}
          <div style={{ display:"flex", justifyContent:"center", marginTop:"10px"}}>
            <Avatar
              alt="Lee"
              src="http://nextagram-lee.s3.amazonaws.com/ironman.jpg"
              className={classes.bigAvatar}
            />
          </div>
          <CardHeader style={{ textAlign: "center" }} title="Username" />
          <div style={{   margin:"5px", borderRadius: 16, border: "1px solid #1589FF", color:"#393333",}}>
          <CardContent style={{ color:"#393333"}}>
            <Typography
              variant="subtitle1"
              component="p"
              align="center"
            >
              <strong>Learning Rating</strong>
            </Typography>
            <Box component="fieldset" mb={3} borderColor="transparent">
              <Rating name="read-only" value={learnRating} readOnly />
            </Box>
            <Typography
              variant="subtitle1"
              component="p"
              align="center"
            >
              <strong>Teaching Rating</strong>
            </Typography>
            <Box component="fieldset" mb={3} borderColor="transparent">
              <Rating name="read-only" value={teachRating} readOnly />
            </Box>
          </CardContent>
          <CardContent style={{ color:"#393333"}}>
            <Typography
              variant="subtitle1"
              component="p"
              align="justify"
            >
              <strong>Email:</strong>
            </Typography>
            <Typography
              variant="body2"
              component="p"
              align="justify"
            >
              Email
            </Typography>
          </CardContent>
          <CardContent style={{ color:"#393333"}}>
            <Typography
              variant="subtitle1"
              component="p"
              align="justify"
            >
              <strong>Skills:</strong>
            </Typography>
            <Typography
              variant="body2"
              component="p"
              align="justify"
            >
              Skills
            </Typography>
          </CardContent>
          </div>
        </Card>
      </div>
    </>
  );
}
