/* Import package components */
import React, { useState } from "react";
import { route } from "../global";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import Divider from '@material-ui/core/Divider';


/* Import app components */
import DialogPage from "../components/DialogPage";

const useStyles = makeStyles(theme => ({
  card: {
    display: "flex",
    height: "14vh",
    width: "96vw",
    borderRadius:16,
    boxShadow: "3px 3px 3px 3px #6699cc",
    marginTop: "10px",
    border: "1px solid #6699cc"
  },
  cover: {
    width: 151
  }
}));

export default function InboxListCard() {
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
      <div style={{ display: "flex", justifyContent: "center" }}>
        <Card className={classes.card}>
          <div style={{ padding: "5px" }}>
            <AccountCircleIcon style={{ color: "#5CB3FF", fontSize: "96px" }} />
          </div>
          <Divider orientation="vertical" />
          <div>
            <CardContent style={{ color:"#393333" }} align="left">
              <Typography>Username</Typography>
              <Typography>Message: Hello World!</Typography>
            </CardContent>
          </div>
        </Card>
      </div>
      <DialogPage
        routeTo={routeTo}
        routeOption={routeOption}
        dialogOpen={dialogOpen}
      />
    </>
  );
}
