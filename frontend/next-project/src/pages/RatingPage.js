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

export default function RatingPage({ parentRouteTo }) {
  const {
    userStore: { getToken }
  } = useStores();
  const [userReview, setUserReview] = useState({
    rating: 5,
    recommend: "True",
    comment: ""
  });
  const handleSubmit = () => {
    const event_id = 3; //hardcode
    axios
      .post(
        `${getApiRoute("events/")}${event_id}/review`,
        userReview,
        getToken()
      )
      .then(result => {
        // console.log(result);
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
      <div style={ContainerStyles}>
      <div style={{ marginTop: "150px" }}>
        <RatingInputForm
          userReview={userReview}
          setUserReview={setUserReview}
        />
      </div>
          <Button
            onClick={() => parentRouteTo(route.close)}
            style={{
              backgroundColor: "#ff0000",
              color: "#FFFFFF",
              fontSize: "16px",
              borderRadius: 16,
              fontWeight: "bold",
              height: "45px",
              width: 360,
              marginTop: "15px"
            }}
          >
            Cancel
          </Button>
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
