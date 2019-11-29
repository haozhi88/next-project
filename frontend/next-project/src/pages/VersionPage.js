/* Import package components */
import React, { useState, useEffect } from "react";
import axios from "axios";
import { getApiRoute, VERSION } from "../global";

/* CSS Styles */
const ContainerStyles = {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  width: "100%",
  paddingTop: "5px"
};

export default function LessonPage() {
  const [version, setVersion] = useState("");
  useEffect(() => {
    axios
      .get(`${getApiRoute("versions/")}`)
      .then(result => {
        const final = "v" + VERSION + "." + result.data; // v{frontend ver}.{backend ver}
        setVersion(final);
      })
      .catch(error => {
        console.log("ERROR: ", error);
      });
  });
  return (
    <>
      <div style={ContainerStyles}>
        <h4>Version: {version}</h4>
      </div>
    </>
  );
}
