/* Import package components */
import React, { useState } from "react";
import { route } from "../global";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import Divider from "@material-ui/core/Divider";

/* Import app components */
import DialogPage from "../components/DialogPage";

const useStyles = makeStyles(theme => ({
  card: {
    display: "flex",
    height: "120px",
    width: "96vw",
    borderRadius: 16,
    marginTop: "10px",
    border: "1px solid #1589FF"
  },
  cover: {
    width: 151
  }
}));

export default function InboxListCard() {
  const classes = useStyles();
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
  return (
    <>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <Card className={classes.card}>
          <div style={{ padding: "5px" }}>
            <AccountCircleIcon style={{ color: "#1589FF", fontSize: "94px" }} />
          </div>
          <Divider orientation="vertical" />
          <div>
            <CardContent
              style={{ color: "#393333", fontSize: "10px" }}
              align="left"
            >
              <Typography>Username</Typography>
              <Typography>Message: Hello World!</Typography>
            </CardContent>
          </div>
        </Card>
      </div>
      <DialogPage
        routeTo={routeTo}
        routeOption={routeOption}
        routeArgs={routeArgs}
        dialogOpen={dialogOpen}
      />
    </>
  );
}
