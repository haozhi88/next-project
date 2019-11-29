import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";
import Rating from "@material-ui/lab/Rating";

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
  return (
    <>
      <Card className={classes.card}>
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
      <br />
    </>
  );
}
