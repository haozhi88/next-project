/* Import package components */
import React, { useState, useEffect } from "react";
import axios from "axios";
import { Button, ButtonGroup } from "@material-ui/core";
import { route, getApiRoute } from "../global";
import useStores from "../hooks/useStores";
import { observer } from "mobx-react";

/* Import app components */
import SignInInputForm from "../pages/SignInInputForm";

/* CSS Styles */
const ContainerStyles = {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  width: "100%",
  paddingTop: "3%",
  overflow: "auto"
};

function SignInPage({ parentRouteTo }) {
  const [userSignIn, setUserSignIn] = useState({
    name: "",
    password: ""
  });

  const {
    userStore: { login }
  } = useStores();

  const [latitude, setLatitude] = useState(null);
  const [longtitude, setLongtitude] = useState(null);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      position => {
        setLatitude(position.coords.latitude);
        console.log(position.coords.latitude);
        setLongtitude(position.coords.longitude);
        console.log(longtitude);
        // const location = JSON.stringify(position);
      },
      error => console.log(error.message),
      { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
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
        const id = result.data.data.id;
        const name = result.data.data.name;
        const profile_picture = result.data.data.profile_picture;
        const email = result.data.data.email;
        const access_token = result.data.data.access_token;
        console.log(result);
        console.log("sign in successfully");
        login(name, id, profile_picture, email, access_token, latitude, longtitude);
      })
      .catch(error => {
        console.log("ERROR: ", error);
      });
    console.log("gtest");
    parentRouteTo(route.close);
  };
  return (
    <>
      <div style={ContainerStyles}>
        <h1 style={{ color: "#393333" }}>Sign In</h1>
        <SignInInputForm
          userSignIn={userSignIn}
          setUserSignIn={setUserSignIn}
        />
        <a
          href="#"
          onClick={() => parentRouteTo(route.signupPage)}
          style={{ fontSize: "15px", marginTop: "25px", color:"#1589FF"  }}
        >
          No account? Sign up now!
        </a>
        <ButtonGroup
          fullWidth
          aria-label="full width button group"
          style={{ position: "absolute", bottom: 0, height: "60px" }}
        >
          <Button
            style={{
              backgroundColor: "#f08080",
              color: "#721C24",
              fontSize: "16px",
              borderRadius: 0
            }}
            onClick={() => parentRouteTo(route.close)}
          >
            Cancel
          </Button>
          <Button
            style={{
              backgroundColor: "#5CB3FF",
              color: "#004085",
              fontSize: "16px",
              borderRadius: 0
            }}
            onClick={handleSignIn}
          >
            Sign In
          </Button>
        </ButtonGroup>
      </div>
    </>
  );
}

export default observer(SignInPage);
