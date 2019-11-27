/* Import package components */
import React, { useState } from "react";
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
  paddingTop: "3%"
};

function SignInPage({ parentRouteTo }) {
  const [userSignIn, setUserSignIn] = useState({
    name: "",
    password: ""
  });

  const {
    userStore: { login }
  } = useStores();

  const handleSignIn = () => {
    // console.log(userSignIn);
    axios
      .post(`${getApiRoute("sessions/signin")}`, {
        name: userSignIn.name,
        password: userSignIn.password
      })
      .then(result => {
        const id = result.data.data.id;
        const name = result.data.data.name;
        const profile_picture = result.data.data.profile_picture;
        const access_token = result.data.data.access_token;
        // console.log(result);
        console.log("sign in successfully");
        localStorage.setItem("userToken", access_token);
        localStorage.setItem("userData", JSON.stringify(name));
        login(name, id, profile_picture);
        parentRouteTo(route.close);
      })
      .catch(error => {
        console.log("ERROR: ", error);
        parentRouteTo(route.close);
      });
  };
  return (
    <>
      <div style={ContainerStyles}>
      <h1 style={{ color:"#393333"}}>Sign In</h1>
        <SignInInputForm
          userSignIn={userSignIn}
          setUserSignIn={setUserSignIn}
        />
        <a href="#" onClick={() => parentRouteTo(route.signupPage)}>No account? Sign up now!</a>
        <ButtonGroup fullWidth aria-label="full width button group" style={{ position:"absolute", bottom:0 , height:"7vh"}}>
          <Button style={{backgroundColor:"#f08080", color:"#721C24", fontSize: "16px", borderRadius: 0}} onClick={() => parentRouteTo(route.close)}>Cancel</Button>
          <Button style={{backgroundColor:"#5CB3FF", color:"#004085", fontSize: "16px", borderRadius: 0}} onClick={handleSignIn}>Sign In</Button>
        </ButtonGroup>
      </div>
    </>
  );
}

export default observer(SignInPage);
