/* Import package components */
import React, { useState } from "react";
import axios from "axios";
import { Button, ButtonGroup } from "@material-ui/core";
import { route, getApiRoute } from "../global";

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
    console.log(lessonInput);
    // Create formdata of image
    let formData = new FormData();
    formData.append("image", userFile);

    // Prepare token
    const token = localStorage.getItem("userToken");
    const config = {
      headers: {
        Authorization: "Bearer " + token
      }
    };
    axios
      .post(
        `${getApiRoute("lessons/create")}`,
        // formData,
        {
          title: lessonInput.title,
          description: lessonInput.description,
          skill: lessonInput.skill,
          teach: teach
        },
        config
      )
      .then(result => {
        // const id = result.data.data.id;
        console.log(result);
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
        <UploadPage userFile={userFile} setUploadFile={setUploadFile} />
        <LessonInputForm
          lessonInput={lessonInput}
          setLessonInput={setLessonInput}
        />
        <ButtonGroup
          fullWidth
          aria-label="full width button group"
          style={{ position: "fixed", bottom: 0, height: "7vh" }}
        >
          <Button
            style={{
              backgroundColor: "#f08080",
              color: "#393333",
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
              color: "#393333",
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
        dialogOpen={dialogOpen}
      />
    </>
  );
}
