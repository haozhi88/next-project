/* Import package components */
import React, { useState } from "react";
import axios from "axios";
import { Button, ButtonGroup } from "@material-ui/core";
import { route, getApiRoute } from "../global";
import useStores from "../hooks/useStores";

/* Import app components */
import DialogPage from "../components/DialogPage";
import LessonInputForm from "../pages/LessonInputForm";
import UploadPage from "../components/UploadPage";

/* CSS Styles */
const ContainerStyles = {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  width: "100vw",
  paddingTop: "10px"
};

export default function CreateLessonPage({ parentRouteTo, teach }) {
  const {
    userStore: { getToken }
  } = useStores();
  const [routeArgs, setRouteArgs] = useState([]);
  const [routeOption, setRouteOption] = useState(route.close);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [userFile, setUploadFile] = useState();
  const [lessonInput, setLessonInput] = useState({
    title: "",
    description: "",
    skill: 3 // hard code first, enable for user to select later
  });
  const routeTo = option => {
    if (option === route.close) {
      setDialogOpen(false);
    } else {
      setDialogOpen(true);
    }
    setRouteOption(option);
  };
  const handleCreate = () => {
    // Create formdata
    let formData = new FormData();
    formData.append("title", lessonInput.title);
    formData.append("description", lessonInput.description);
    formData.append("skill", lessonInput.skill);
    formData.append("teach", teach);
    if (userFile) {
      formData.append("image", userFile[0]);
    }
    axios
      .post(`${getApiRoute("lessons/create")}`, formData, getToken())
      .then(result => {
        // const id = result.data.data.id;
        console.log(result);
      })
      .catch(error => {
        console.log("ERROR: ", error);
      });
    parentRouteTo(route.close);
  };

  return (
    <>
      <div style={ContainerStyles}>
        <UploadPage userFile={userFile} setUploadFile={setUploadFile} />
        <LessonInputForm
          lessonInput={lessonInput}
          setLessonInput={setLessonInput}
        />
        <ButtonGroup
          fullWidth
          aria-label="full width button group"
          style={{ position: "absolute", bottom: 0, height: "7vh" }}
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
            onClick={handleCreate}
          >
            Create
          </Button>
        </ButtonGroup>
      </div>
      <DialogPage
        routeTo={routeTo}
        routeOption={routeOption}
        routeArgs={routeArgs}
        dialogOpen={dialogOpen}
      />
    </>
  );
}
