/* Import package components */
import React, { useState, useEffect } from "react";
import axios from "axios";
import { Button } from "@material-ui/core";
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
        setLongtitude(position.coords.longitude);
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
      });
    parentRouteTo(route.close);
  };
  return (
    <>
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
          onClick={() => parentRouteTo(route.signupPage)}
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
    </>
  );
}

export default observer(SignInPage);
