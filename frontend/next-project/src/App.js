/* Import package components */
import React from "react";
import { Grid, CssBaseline } from "@material-ui/core";
import useStores from "../src/hooks/useStores";
import { observer } from "mobx-react";
/* Import app components */
import TopNav from "./components/TopNav";
import Content from "./components/Content";
import FirstSignIn from "../src/pages/FirstSignInPage"

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

function App() {
  const {
    userStore: { currentUser, logout }
  } = useStores();
  function SignInUser(){
    if (currentUser.loggedIn) {
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
    else{
      return (
        <>
          <Grid container direction="column">
            <FirstSignIn/>
          </Grid>
          <CssBaseline />
        </>
      );
    }
  }
  return(
    <>
    {SignInUser()}
    </>
  )
}
export default observer(App)