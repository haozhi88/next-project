/* Import package components */
import React, { useState } from "react";
import { Button, ButtonGroup } from "@material-ui/core";
import { route } from "../global";

/* Import app components */
import RatingInputForm from "../pages/RatingInputForm";

/* CSS Styles */
const ContainerStyles = {
  display: "flex",
  justifyContent: "center",
  flexDirection: "column",
  alignItems: "center",
  width: "100%"
};

export default function RatingPage({ parentRouteTo }) {
  return (
    <>
      <div style={{ position: "relative", top: "150px"}}>
        <RatingInputForm /> 
      </div>   
      <div style={ContainerStyles}>
        <ButtonGroup fullWidth aria-label="full width button group" style={{ position: "fixed", bottom: "0", height:"7vh"}}>
          <Button onClick={() => parentRouteTo(route.close)} style={{ backgroundColor:"#f08080", color:"#721C24", fontSize: "16px", borderRadius: 0}}>Cancel</Button>
          <Button onClick={() => parentRouteTo(route.close)} style={{ backgroundColor:"#5CB3FF", color:"#004085", fontSize: "16px", borderRadius: 0}}>Submit</Button>
        </ButtonGroup>
      </div>
    </>
  );
}
