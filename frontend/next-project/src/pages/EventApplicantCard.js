/* Import package components */
import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  Button,
  ButtonGroup,
  Typography
} from "@material-ui/core";

const useStyles = makeStyles({
  card: {
    width: 345,
    borderRadius: 16,
    marginTop: "10px",
    border: "1px solid #1589FF"
  },
  media: {
    height: 200
  },
  contentText: {
    color: "#4c4c4c",
    fontSize: "15px"
  }
});

export default function EventApplicantCard({
  event,
  handleLinkLesson,
  handleAction,
  handleRating
}) {
  const classes = useStyles();
  function actionButton() {
    if (event.status === "approved") {
      return (
        <CardActions style={{ padding: "0px" }}>
          <ButtonGroup fullWidth aria-label="full width button group">
            <Button
              style={{
                backgroundColor: "#f08080",
                color: "#721C24",
                fontSize: "16px"
              }}
              onClick={() => {
                handleAction(event.id, "complete");
              }}
            >
              Complete
            </Button>
          </ButtonGroup>
        </CardActions>
      );
    } else if (event.status === "complete") {
      return (
        <CardActions style={{ padding: "0px" }}>
          <ButtonGroup fullWidth aria-label="full width button group">
            <Button
              style={{
                backgroundColor: "#f08080",
                color: "#721C24",
                fontSize: "16px"
              }}
              onClick={() => {
                handleRating(event.id);
              }}
            >
              Rate
            </Button>
          </ButtonGroup>
        </CardActions>
      );
    } else {
      return <></>;
    }
  }
  return (
    <Card className={classes.card}>
      <CardActionArea
        onClick={() => {
          handleLinkLesson(event.lesson_id);
        }}
      >
        <CardContent align="left">
          <Typography gutterBottom variant="h5" component="h2">
            {event.lesson_title}
          </Typography>
          <Typography
            variant="body2"
            className={classes.contentText}
            component="p"
          >
            Request To: <strong>{event.owner_name}</strong>
          </Typography>
          <Typography
            variant="body2"
            className={classes.contentText}
            component="p"
          >
            Date: <strong>{event.start_datetime}</strong>
          </Typography>
          <Typography
            variant="body2"
            className={classes.contentText}
            component="p"
          >
            Time: <strong>5:00 P.M.</strong>
          </Typography>
          <Typography
            variant="body2"
            className={classes.contentText}
            component="p"
          >
            Status: <strong>{event.status}</strong>
          </Typography>
        </CardContent>
      </CardActionArea>
      {actionButton()}
    </Card>
  );
}
