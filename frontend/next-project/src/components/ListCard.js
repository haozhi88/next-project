import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";
import Rating from "@material-ui/lab/Rating";
import { getApiRoute } from "../global";
import { route } from "../global";
import DialogPage from "../components/DialogPage";

const useStyles = makeStyles(theme => ({
  card: {
    display: "flex",
    height: "180px",
    width: "98vw",
    borderRadius: 16,
    border: "1px solid #1589FF",
    color: "#393333",
    fontSize: "10px"
  },
  cover: {
    width: 151
  }
}));

export default function ListCard({lesson}) {
  const classes = useStyles();
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
    <Card className={classes.card} onClick={() => routeTo(route.lessonPage)}>
      <CardMedia
        className={classes.cover}
        image="https://desmond-nextagram.s3-ap-southeast-1.amazonaws.com/cat4.png"
        title="Live from space album cover"
      />
      <div>
        <CardContent align="left">
          <Typography>Title: {lesson.title}</Typography>
          <Typography>Author: {lesson.owner}</Typography>
          <Typography>Skill: Computer Science</Typography>
          <Typography>Lesson Rating:</Typography>
          <Rating name="read-only" value={lesson.value} readOnly />
        </CardContent>
      </div>
    </Card>
    <DialogPage
        routeTo={routeTo}
        routeOption={routeOption}
        dialogOpen={dialogOpen}
      />
    <br/>
    </>
  );
}
