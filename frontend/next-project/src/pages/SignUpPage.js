/* Import package components */
import React, { useState } from "react";
import axios from "axios";
import { Button, ButtonGroup } from "@material-ui/core";
import { route, getApiRoute } from "../global";
import useStores from "../hooks/useStores";
import { observer } from "mobx-react";

/* Import app components */
import SignUpInputForm from "../pages/SignUpInputForm";

/* CSS Styles */
const ContainerStyles = {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  width: "100%",
  paddingTop: "3%",
  overflow: "auto",
};

function SignUpPage({ parentRouteTo }) {
  const [userSignUp, setUserSignUp] = useState({
    name: "",
    email: "",
    password: ""
  });

  const {
    userStore: { login }
  } = useStores();

  const handleSignUp = () => {
    // console.log(userSignUp);
    axios
      .post(`${getApiRoute("users/signup")}`, userSignUp)
      .then(result => {
        const id = result.data.data.id;
        const name = result.data.data.name;
        const profile_picture = result.data.data.profile_picture;
        const email = result.data.data.email;
        const access_token = result.data.data.access_token;
        console.log(result);
        console.log("sign up successfully");
        localStorage.setItem("userToken", access_token);
        localStorage.setItem("userData", JSON.stringify(name));
        login(name, id, profile_picture, email);
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
        <h1 style={{ color: "#393333" }}>Create an account</h1>
        <SignUpInputForm
          userSignUp={userSignUp}
          setUserSignUp={setUserSignUp}
        />
        <a href="#" onClick={() => parentRouteTo(route.signinPage)} style={{ fontSize:"15px",marginTop:"25px" }}>
          Have an account? Sign In now!
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
            onClick={handleSignUp}
          >
            Sign Up
          </Button>
        </ButtonGroup>
      </div>
    </>
  );
}

export default observer(SignUpPage);
