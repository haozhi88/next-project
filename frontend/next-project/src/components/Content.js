/* Import package components */
import React, { useState, useEffect } from "react";
import { Grid, Button } from "@material-ui/core";
import { route } from "../global";
import useStores from "../hooks/useStores";
import { observer } from "mobx-react";

/* Import app components */
import DialogPage from "../components/DialogPage";
import { generateData } from "../test/GenerateTestData";
import LoadingNav from "../components/LoadingNav";

function Content() {
  const {
    userStore: { currentUser, logout, checkUserLoggedIn }
  } = useStores();
  const [routeArgs, setRouteArgs] = useState([]);
  const [routeOption, setRouteOption] = useState(route.close);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true) 

  const routeTo = option => {
    if (option === route.close) {
      setDialogOpen(false);
    } else {
      setDialogOpen(true);
    }
    setRouteOption(option);
  };
  useEffect(() => {
    // Check if user already logged in
    if (!currentUser.loggedIn) {
      checkUserLoggedIn();
      
    }
    setIsLoading(false)
  }, []);
  
  if(isLoading){
    return <LoadingNav />
  }
  return (
    <>
      <h1>Content</h1>
      <h4>User: {currentUser.name}</h4>
      <h4>ID: {currentUser.id}</h4>
      <Grid item>
        <Button
          variant="outlined"
          color="secondary"
          onClick={() => routeTo(route.eventApplicantListPage)}
        >
          Event Applied
        </Button>
        <Button
          variant="outlined"
          color="secondary"
          onClick={() => routeTo(route.eventOwnerListPage)}
        >
          Event Owned
        </Button>
        <Button
          variant="outlined"
          color="primary"
          onClick={() => routeTo(route.teachListPage)}
        >
          Teach List
        </Button>
        <Button
          variant="outlined"
          color="primary"
          onClick={() => routeTo(route.learnListPage)}
        >
          Learn List
        </Button>
        <Button
          variant="outlined"
          color="secondary"
          onClick={() => routeTo(route.bookmarkListPage)}
        >
          Bookmark List
        </Button>
        <Button
          variant="outlined"
          color="primary"
          onClick={() => routeTo(route.signinPage)}
        >
          Sign In
        </Button>
        <Button
          variant="outlined"
          color="primary"
          onClick={() => routeTo(route.signupPage)}
        >
          Sign Up
        </Button>
        <Button
          variant="outlined"
          color="primary"
          onClick={() => {
            console.log("sign out successfully");
            logout();
          }}
        >
          Sign Out
        </Button>
        <Button
          variant="outlined"
          color="primary"
          onClick={() => routeTo(route.profilePage)}
        >
          Profile
        </Button>
        <Button
          variant="outlined"
          color="primary"
          onClick={() => routeTo(route.createLearnPage)}
        >
          Create Learn
        </Button>
        <Button
          variant="outlined"
          color="primary"
          onClick={() => routeTo(route.createTeachPage)}
        >
          Create Teach
        </Button>
        <Button
          variant="outlined"
          color="secondary"
          onClick={() => routeTo(route.ratingPage)}
        >
          Rating
        </Button>
        <Button
          variant="outlined"
          color="primary"
          onClick={() => routeTo(route.versionPage)}
        >
          APP Version
        </Button>
        <Button variant="outlined" color="primary" onClick={generateData}>
          Test AXIOS
        </Button>
      </Grid>
      <DialogPage
        routeTo={routeTo}
        routeOption={routeOption}
        routeArgs={routeArgs}
        dialogOpen={dialogOpen}
      />
    </>
  );
}

export default observer(Content);
