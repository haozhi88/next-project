/* Import package components */
import React, { useState } from "react";
import { Container, Button, ButtonGroup } from "@material-ui/core";
import { route } from "../global";

/* Import app components */
import DialogPage from "../components/DialogPage";
import LessonInputForm from "../pages/LessonInputForm";
import UploadPage from "../components/UploadPage"

/* CSS Styles */
const ContainerStyles = {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  width: "100vw",
  paddingTop: "10px"
};

export default function CreateLessonPage({ parentRouteTo, teach }) {
  const [routeOption, setRouteOption] = useState(route.close);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [userFile, setUploadFile] = useState()
  const routeTo = option => {
    if (option === route.close) {
      setDialogOpen(false);
    } else {
      setDialogOpen(true);
    }
    setRouteOption(option);
  };

  return (
    <>
      <div style={ContainerStyles}>
        <UploadPage 
         userFile={userFile}
         setUploadFile={setUploadFile}
        />
        <LessonInputForm />
        <ButtonGroup fullWidth aria-label="full width button group" style={{position:"fixed", bottom:0 , height:"7vh"}}>
          <Button style={{backgroundColor:"#f08080", color:"#393333", fontSize: "16px", borderRadius: 0}} onClick={() => parentRouteTo(route.close)}>Cancel</Button>
          <Button style={{backgroundColor:"#5CB3FF", color:"#393333", fontSize: "16px", borderRadius: 0}} onClick={() => parentRouteTo(route.close)} onClick={() => routeTo(route.todo)}>Create</Button>
        </ButtonGroup>
      </div>
      <DialogPage
        routeTo={routeTo}
        routeOption={routeOption}
        dialogOpen={dialogOpen}
      />
    </>
  );
}
