/* Import package components */
import React, { useState, useEffect } from "react";
import axios from "axios";
import { Button } from "@material-ui/core";
import { route, getApiRoute } from "../global";
import useStores from "../hooks/useStores";
import { observer } from "mobx-react";
import DialogPage from "../components/DialogPage";
import Toolbar from "@material-ui/core/Toolbar";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Slide from "@material-ui/core/Slide";

/* Import app components */
import LoadingNav from "../components/LoadingNav";
import SignInInputForm from "../pages/SignInInputForm";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

/* CSS Styles */
const ContainerStyles = {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  width: "100%",
  paddingTop: "3%",
  overflow: "auto"
};

const navBackgroundColor = {
  backgroundColor: "#1589FF",
  textAlign: "center"
};

function FirstSignIn() {
  const [userSignIn, setUserSignIn] = useState({
    name: "",
    password: ""
  });

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const {
    userStore: { currentUser, checkUserLoggedIn, login }
  } = useStores();

  const [open, setOpen] = useState(false);
  const [routeArgs, setRouteArgs] = useState([]);
  const [routeOption, setRouteOption] = useState(route.close);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const routeTo = option => {
    if (option === route.close) {
      setDialogOpen(false);
    } else {
      setDialogOpen(true);
    }
    setRouteOption(option);
  };
  const [latitude, setLatitude] = useState(3.1424113);
  const [longtitude, setLongtitude] = useState(101.6271656);

  useEffect(() => {
    // Check if user already logged in
    if (!currentUser.loggedIn) {
      checkUserLoggedIn();
    }

    // Get geolocation
    navigator.geolocation.getCurrentPosition(
      position => {
        setLatitude(position.coords.latitude);
        setLongtitude(position.coords.longitude);
      },
      error => console.log(error.message),
      {
        enableHighAccuracy: true,
        timeout: 20000,
        maximumAge: 1000
      }
    );
  }, []);

  const handleSignIn = () => {
    axios
      .post(`${getApiRoute("sessions/signin")}`, {
        userSignIn,
        latitude: latitude,
        longtitude: longtitude
      })
      .then(result => {
        // console.log(result);
        console.log("sign in successfully");
        login(
          result.data.data.name,
          result.data.data.id,
          result.data.data.profile_picture,
          result.data.data.email,
          result.data.data.access_token,
          latitude,
          longtitude,
          result.data.data.skills
        );
      })
      .catch(error => {
        console.log("ERROR: ", error);
        handleClickOpen();
        setUserSignIn({ name: "", password: "" });
      });
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
    }, 2000);
  };
  if (isLoading) {
    return <LoadingNav />;
  }
  return (
    <>
      <div style={navBackgroundColor}>
        <Toolbar
          style={{ display: "flex", width: "100vw", justifyContent: "center" }}
        >
          <div style={{ width: "100vw", justifyContent: "center" }}>
            <h2 style={{ color: "white" }}>Sign In</h2>
          </div>
        </Toolbar>
      </div>

      <div style={ContainerStyles}>
        <img
          src={require("../media/peerskill512.png")}
          style={{
            width: "240px",
            height: "240px"
          }}
          alt="app logo"
        />
        <SignInInputForm
          userSignIn={userSignIn}
          setUserSignIn={setUserSignIn}
        />

        <a
          href="#"
          onClick={() => routeTo(route.signupPage)}
          style={{ fontSize: "15px", marginTop: "25px", color: "#1589FF" }}
        >
          No account? Sign up now!
        </a>
        <br></br>
        <Button
          style={{
            backgroundColor: "#1589FF",
            color: "#FFFFFF",
            fontSize: "16px",
            borderRadius: 16,
            fontWeight: "bold",
            height: "45px",
            width: 360,
            marginTop: "5px"
          }}
          onClick={handleSignIn}
        >
          Sign In
        </Button>
      </div>
      <DialogPage
        routeTo={routeTo}
        routeOption={routeOption}
        routeArgs={routeArgs}
        dialogOpen={dialogOpen}
      />
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-labelledby="alert-dialog-slide-title"
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle id="alert-dialog-slide-title" style={{ color: "#1589FF" }}>
          Sign In failed.
        </DialogTitle>
        <DialogContent>
          <DialogContentText
            id="alert-dialog-slide-description"
            style={{ color: "black" }}
          >
            Please try again. Thank you.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} style={{ color: "#1589FF" }}>
            CONTINUE
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

export default observer(FirstSignIn);
