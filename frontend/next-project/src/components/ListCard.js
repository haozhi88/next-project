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
    height: "22vh",
    width: "98vw",
    borderRadius: 16,
    border: "1px solid #1589FF", 
    color:"#393333",
    fontSize:"10px"
  },
  cover: {
    width: 151
  }
}));

export default function ListCard() {
  const classes = useStyles();
  const value = 2;

  return (
    <div style={{ display: "flex", justifyContent:"center"}}>
    <Card className={classes.card}>
      <CardMedia
        className={classes.cover}
        image="https://desmond-nextagram.s3-ap-southeast-1.amazonaws.com/cat4.png"
        title="Live from space album cover"
      />
      <div>
        <CardContent align="left">
          <Typography>Title: Some Lesson</Typography>
          <Typography>Author: Someone</Typography>
          <Typography>Skill Categories: Computer Science</Typography>
          <Typography>Lesson Rating:</Typography>
          <Rating name="read-only" value={value} readOnly />
        </CardContent>
      </div>
    </Card>
    </div>
  );
}
