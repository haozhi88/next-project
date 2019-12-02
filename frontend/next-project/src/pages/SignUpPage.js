/* Import package components */
import React, { useState } from "react";
import axios from "axios";
import { Button } from "@material-ui/core";
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
  overflow: "auto"
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
        // console.log(result);
        console.log("sign up successfully");
        login(name, id, profile_picture, email, access_token);
      })
      .catch(error => {
        console.log("ERROR: ", error);
      });
    parentRouteTo(route.close);
  };
  return (
    <>
      <div style={ContainerStyles}>
        <h1 style={{ color: "#393333" }}>Create an account</h1>
        <SignUpInputForm
          userSignUp={userSignUp}
          setUserSignUp={setUserSignUp}
        />
        <a
          href="#"
          onClick={() => parentRouteTo(route.signinPage)}
          style={{ fontSize: "15px", marginTop: "25px", color: "#1589FF" }}
        >
          Have an account? Sign In now!
        </a>
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
          onClick={handleSignUp}
        >
          Sign Up
        </Button>
      </div>
    </>
  );
}

export default observer(SignUpPage);
