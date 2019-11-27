/* Import package components */
import React, { useState } from "react";
import axios from "axios";
import { Button, ButtonGroup } from "@material-ui/core";
import { route, getApiRoute } from "../global";

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
  const [userReview, setUserReview] = useState({
    rating: 5,
    recommend: "True",
    comment: ""
  });
  const handleSubmit = () => {
    console.log(userReview);
    const event_id = 3; //hardcode
    axios
      .post(`${getApiRoute("events/")}${event_id}/review`, userReview)
      .then(result => {
        console.log(result);
        console.log("submit rating successfully");
        parentRouteTo(route.close);
      })
      .catch(error => {
        console.log("ERROR: ", error);
        parentRouteTo(route.close);
      });
  };
  return (
    <>
      <div style={{ position: "relative", top: "150px" }}>
        <RatingInputForm
          userReview={userReview}
          setUserReview={setUserReview}
        />
      </div>
      <div style={ContainerStyles}>
        <ButtonGroup
          fullWidth
          aria-label="full width button group"
          style={{ position: "fixed", bottom: "0", height: "7vh" }}
        >
          <Button
            onClick={() => parentRouteTo(route.close)}
            style={{
              backgroundColor: "#f08080",
              color: "#721C24",
              fontSize: "16px",
              borderRadius: 0
            }}
          >
            Cancel
          </Button>
          <Button
            onClick={handleSubmit}
            style={{
              backgroundColor: "#5CB3FF",
              color: "#004085",
              fontSize: "16px",
              borderRadius: 0
            }}
          >
            Submit
          </Button>
        </ButtonGroup>
      </div>
    </>
  );
}
