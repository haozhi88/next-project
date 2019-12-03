/* Import package components */
import React, { useState } from "react";
import axios from "axios";
import { Button } from "@material-ui/core";
import { route, getApiRoute } from "../global";
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';

/* Import app components */
import SignUpInputForm from "../pages/SignUpInputForm";
import LoadingNav from "../components/LoadingNav";

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

export default function SignUpPage({ parentRouteTo }) {
  const [userSignUp, setUserSignUp] = useState({
    name: "",
    email: "",
    password: ""
  });

  const [open, setOpen] = useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const [isLoading, setIsLoading] = useState(false);
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
        handleClickOpen()
        setUserSignUp({
          name:"",
          email:"",
          password:""
        })
      });
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      console.log("setTimeOut");
    }, 2000);
  };
  //loader
  if (isLoading) {
    return <LoadingNav />;
  }
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
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-labelledby="alert-dialog-slide-title"
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle id="alert-dialog-slide-title" style={{ color:"#1589FF"}}>Sign Up account failed. WHY?</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description" style={{ color:"black"}}>
            Please try agian. Thank you.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} style={{ color:"#1589FF"}}>
            CONTINUE
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
