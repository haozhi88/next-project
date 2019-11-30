/* Import package components */
import React from "react";
import { Button, ButtonGroup } from "@material-ui/core";
import { route } from "../global";

/* CSS Styles */
const ContainerStyles = {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  width: "100%"
};

export default function EventPage({ parentRouteTo }) {
  return (
    <>
      <div style={ContainerStyles}>
        <h1>Event</h1>
        <ButtonGroup fullWidth aria-label="full width button group">
          <Button onClick={() => parentRouteTo(route.close)}>Decline</Button>
          <Button onClick={() => parentRouteTo(route.close)}>Approve</Button>
        </ButtonGroup>
      </div>
    </>
  );
}
