/* Import package components */
import React, { useState } from "react";
import axios from "axios";
import { Button } from "@material-ui/core";
import { route, getApiRoute, skills } from "../global";
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
    index: 0 // hard code first, enable for user to select later
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
    console.log("index:" + lessonInput.index)
    console.log("skill id:" + skills[lessonInput.index].id)
    console.log("skill name:" + skills[lessonInput.index].name)
    // Create formdata
    let formData = new FormData();
    formData.append("title", lessonInput.title);
    formData.append("description", lessonInput.description);
    formData.append("skill", skills[lessonInput.index].id);
    formData.append("teach", teach);
    if (userFile) {
      formData.append("image", userFile[0]);
    }
    axios
      .post(`${getApiRoute("lessons/create")}`, formData, getToken())
      .then(result => {
        // const id = result.data.data.id;
        // console.log(result);
        console.log("create lesson successfully");
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
          skills = {skills}
        />
          <Button
            style={{
              backgroundColor: "#ff0000",
              color: "#FFFFFF",
              fontSize: "16px",
              borderRadius: 16,
              fontWeight: "bold",
              height: "45px",
              width: 360,
              marginTop: "20px"
            }}
            onClick={() => parentRouteTo(route.close)}
          >
            Cancel
          </Button>
          <Button
            style={{
              backgroundColor: "#1589FF",
              color: "#FFFFFF",
              fontSize: "16px",
              borderRadius: 16,
              fontWeight: "bold",
              height: "45px",
              width: 360,
              marginTop: "10px"
            }}
            onClick={handleCreate}
          >
            Create
          </Button>
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
