/* Import package components */
import React from "react";
import { Grid, CssBaseline } from "@material-ui/core";

/* Import app components */
import TopNav from "./components/TopNav";
import Content from "./components/Content";

/* CSS Styles */
const ContainerStyles = {
  height: "calc(100vh - 56px)",
  width: "100vw",
  overflowX: "hidden",
  overflowY: "auto",
  display: "grid",
  justifyContent: "center",
  textAlign:"center",
};

export default function App() {
  return (
    <>
      <Grid container direction="column">
        <TopNav />
        <div style={ContainerStyles}>
          <Content />
        </div>
      </Grid>
      <CssBaseline />
    </>
  );
}
