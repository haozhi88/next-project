/* Import package components */
import React, { useState } from "react";
import { Button, ButtonGroup } from "@material-ui/core";
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
  return (
    <>
      <div style={ContainerStyles}>
        <LessonInfoPage lesson={parentRouteArgs} />
        <ButtonGroup
          fullWidth
          aria-label="full width button group"
          style={{
            position: "relative ",
            bottom: 0,
            height: "7vh"
          }}
        >
          <Button
            style={{
              backgroundColor: "#ffd700",
              color: "#393333",
              fontSize: "14px",
              borderRadius: 0
            }}
            onClick={() => routeTo(route.todo)}
          >
            Bookmark
          </Button>
          <Button
            style={{
              backgroundColor: "#5CB3FF",
              color: "#004085",
              fontSize: "14px",
              borderRadius: 0
            }}
            onClick={() => routeTo(route.todo)}
          >
            Chat
          </Button>
          <Button
            style={{
              backgroundColor: "#90ee90",
              color: "#155724",
              fontSize: "14px",
              borderRadius: 0
            }}
            onClick={() => routeTo(route.createEventPage)}
          >
            Request
          </Button>
        </ButtonGroup>
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
