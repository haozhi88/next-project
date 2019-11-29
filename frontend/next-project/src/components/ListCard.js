import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";
import Rating from "@material-ui/lab/Rating";
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
    width: "40vw"
  }
}));

export default function ListCard({ lesson }) {
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
          image={lesson.image_url}
          title="Lesson image"
        />
        <div>
          <CardContent align="left" style={{ width: "60vw" }}>
            <Typography>Title: {lesson.title}</Typography>
            <Typography>Author: {lesson.owner_name}</Typography>
            <Typography>Skill: {lesson.skill_name}</Typography>
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
      <br />
    </>
  );
}
