/* Import package components */
import React, { useState } from "react";
import axios from "axios";
import { Button } from "@material-ui/core";
import { route, getApiRoute } from "../global";
import useStores from "../hooks/useStores";

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

export default function RatingPage({ parentRouteTo, parentRouteArgs }) {
  const {
    userStore: { getToken }
  } = useStores();
  const [userReview, setUserReview] = useState({
    rating: 5,
    recommend: "True",
    comment: ""
  });
  const handleSubmit = () => {
    const event_id = parentRouteArgs.event_id;
    axios
      .post(
        `${getApiRoute("events/")}${event_id}/review`,
        userReview,
        getToken()
      )
      .then(result => {
        // console.log(result);
        console.log("submit rating successfully");
      })
      .catch(error => {
        console.log("ERROR: ", error);
      });
    parentRouteTo(route.close);
  };
  return (
    <>
      <div style={ContainerStyles}>
        <div style={{ marginTop: "150px" }}>
          <RatingInputForm
            userReview={userReview}
            setUserReview={setUserReview}
          />
        </div>
        <Button
          onClick={handleSubmit}
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
        >
          Submit
        </Button>
      </div>
    </>
  );
}
