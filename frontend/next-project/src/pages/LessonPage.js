/* Import package components */
import React, { useState } from "react";
import { Button } from "@material-ui/core";
import { route } from "../global";

/* Import app components */
import DialogPage from "../components/DialogPage";
import LessonInfoPage from "../pages/LessonInfoPage";

/* CSS Styles */
const ContainerStyles = {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  width: "100%",
  paddingTop: "5px"
};

export default function LessonPage({ parentRouteArgs }) {
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
  //sign in button if currentUser logged in
  function actionButton() {
    if (parentRouteArgs.showAction) {
      return (
        <>
          <Button
            style={{
              backgroundColor: "#ffd100",
              color: "#FFFFFF",
              fontSize: "18px",
              borderRadius: 16,
              marginTop: "5px",
              height: "45px",
              width: 360,
              fontWeight: "bold"
            }}
            onClick={() => routeTo(route.todo)}
          >
            Bookmark
          </Button>
          <Button
            style={{
              backgroundColor: "#32cd32",
              color: "#FFFFFF",
              fontSize: "18px",
              borderRadius: 16,
              marginTop: "5px",
              marginBottom: "20px",
              height: "45px",
              width: 360,
              fontWeight: "bold"
            }}
            onClick={() => {
              setRouteArgs(parentRouteArgs.lesson);
              routeTo(route.createEventPage);
            }}
          >
            Request
          </Button>
        </>
      );
    } else {
      return <></>;
    }
  }
  return (
    <>
      <div style={ContainerStyles}>
        <LessonInfoPage lesson={parentRouteArgs.lesson} />
        {actionButton()}
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
