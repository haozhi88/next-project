/* Import package components */
import React from "react";
import {
  Avatar,
  Card,
  CardHeader,
  CardMedia,
  CardContent,
  Typography
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { red } from "@material-ui/core/colors";

/* CSS Styles */
const useStyles = makeStyles(theme => ({
  card: {
    maxWidth: 345,
    borderRadius: 16,
    border: "1px solid #1589FF",
    color: "#393333"
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
  avatar: {
    backgroundColor: red[500]
  },
  cardContent: {
    color: "#4c4c4c"
  }
}));

export default function LessonInfoPage({ lesson }) {
  const classes = useStyles();
  return (
    <>
      <Card className={classes.card}>
        <CardMedia
          className={classes.media}
          image={lesson.image_url}
          title="Lesson image"
        />
        <CardHeader
          style={{ textAlign: "left" }}
          avatar={
            <Avatar aria-label="recipe" className={classes.avatar}>
              A
            </Avatar>
          }
          title={lesson.title}
          // subheader="November 25, 2019"
        />
        <CardContent className={classes.cardContent}>
          <Typography variant="subtitle1" component="p" align="justify">
            <strong>Description</strong>
          </Typography>
          <Typography variant="body2" component="p" align="justify">
            {lesson.description}
          </Typography>
        </CardContent>
        <CardContent className={classes.cardContent}>
          <Typography variant="subtitle1" component="p" align="justify">
            <strong>Author:</strong>
          </Typography>
          <Typography variant="body2" component="p" align="justify">
            {lesson.owner_name}
          </Typography>
        </CardContent>
        <CardContent>
          <Typography variant="subtitle1" component="p" align="justify">
            <strong>Skills</strong>
          </Typography>
          <Typography variant="body2" component="p" align="justify">
            {lesson.skill_name}
          </Typography>
        </CardContent>
      </Card>
    </>
  );
}
