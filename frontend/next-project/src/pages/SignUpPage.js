/* Import package components */
import React, { useState } from "react";
import axios from "axios";
import { Button } from "@material-ui/core";
import { route, getApiRoute } from "../global";
import useStores from "../hooks/useStores";
import { observer } from "mobx-react";

/* Import app components */
import SignUpInputForm from "../pages/SignUpInputForm";
import LoadingNav from "../components/LoadingNav";

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
  const [isLoading, setIsLoading] = useState(false);

  const {
    userStore: { login }
  } = useStores();

  const handleSignUp = () => {
    // console.log(userSignUp);
    axios
      .post(`${getApiRoute("users/signup")}`, userSignUp)
      .then(result => {
        // console.log(result);
        console.log("sign up successfully");
      })
      .catch(error => {
        console.log("ERROR: ", error);
      });
      setIsLoading(true)
      setTimeout(()=> {
        setIsLoading(false)
        parentRouteTo(route.close);
        console.log("setTimeOut")
      }, 2000)
  };
    //loader
  if(isLoading){
    return <LoadingNav />
  }
  return (
    <>
      <div style={ContainerStyles}>
      <img
              src={require('../media/peerskill512.png')}
              style={{
                width: "240px",
                height: "240px"
              }}
            />
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
          onClick={handleSignUp}
        >
          Sign Up
        </Button>
      </div>
    </>
  );
}

export default observer(SignUpPage);
