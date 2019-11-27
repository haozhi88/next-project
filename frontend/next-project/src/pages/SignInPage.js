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
  width: "100%"
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
        <SignInInputForm
          userSignIn={userSignIn}
          setUserSignIn={setUserSignIn}
        />
        <ButtonGroup fullWidth aria-label="full width button group">
          <Button onClick={() => parentRouteTo(route.close)}>Cancel</Button>
          <Button onClick={handleSignIn}>Sign In</Button>
        </ButtonGroup>
      </div>
    </>
  );
}

export default observer(SignInPage);
