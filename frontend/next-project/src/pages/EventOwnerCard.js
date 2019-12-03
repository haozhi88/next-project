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

export default function EventOwnerCard({
  event,
  handleLinkLesson,
  handleAction
}) {
  const classes = useStyles();
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
            Request By: <strong>{event.user_name}</strong>
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
      <CardActions style={{ padding: "0px" }}>
        <ButtonGroup fullWidth aria-label="full width button group">
          <Button
            style={{
              backgroundColor: "#ffd100",
              color: "#FFFFFF",
              fontSize: "18px",
              borderRadius: 16,
              // marginTop: "5px",
              height: "45px",
              width: 360,
              fontWeight: "bold"
            }}
            onClick={() => {
              handleAction(event.id, "declined");
            }}
          >
            Decline
          </Button>
          <Button
            style={{
              backgroundColor: "#32cd32",
              color: "#FFFFFF",
              fontSize: "18px",
              borderRadius: 16,
              // marginTop: "5px",
              // marginBottom: "20px",
              height: "45px",
              width: 360,
              fontWeight: "bold"
            }}
            onClick={() => {
              handleAction(event.id, "approved");
            }}
          >
            Approve
          </Button>
        </ButtonGroup>
      </CardActions>
    </Card>
  );
}
