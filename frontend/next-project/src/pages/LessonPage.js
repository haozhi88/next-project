/* Import package components */
import React, { useState, useEffect } from "react";
import { Button } from "@material-ui/core";
import { route, getApiRoute } from "../global";
import axios from "axios";

/* Import app components */
import DialogPage from "../components/DialogPage";
import LessonInfoPage from "../pages/LessonInfoPage";

/* CSS Styles */
const ContainerStyles = {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  width: "100%",
  paddingTop: "5px"
};

export default function LessonPage({ parentRouteArgs }) {
  const [bookmark, setBookmark] = useState(null);
  const [routeArgs, setRouteArgs] = useState([]);
  const [routeOption, setRouteOption] = useState(route.close);
  const [dialogOpen, setDialogOpen] = useState(false);
  const routeTo = option => {
    if (option === route.close) {
      setDialogOpen(false);
    } else {
      setDialogOpen(true);
    }
    setRouteOption(option);
  };

  useEffect(() => {
    axios
      .get(`${getApiRoute("bookmarks/")}${parentRouteArgs.lesson.id}`, {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("userToken")
        }
      })
      .then(result => {
        setBookmark(result.data.data);
      })
      .catch(error => {
        console.log(error);
      });
  }, []);

  const createBookmark = e => {
    e.preventDefault();
    const token = localStorage.getItem("userToken");
    const config = {
      headers: {
        Authorization: "Bearer " + token
      }
    };
    axios
      .post(
        `${getApiRoute("bookmarks/create")}`,
        {
          lesson_id: parentRouteArgs.lesson.id
        },
        config
      )
      .then(() => {
        setBookmark(true);
      })
      .catch(error => {
        console.log(error);
      });
  };

  const deleteBookmark = e => {
    e.preventDefault();
    const token = localStorage.getItem("userToken");
    const config = {
      headers: {
        Authorization: "Bearer " + token
      }
    };
    axios
      .post(
        `${getApiRoute("bookmarks/delete")}`,
        {
          lesson_id: parentRouteArgs.lesson.id
        },
        config
      )
      .then(setBookmark(null))
      .catch(error => {
        console.log(error);
      });
  };
  function actionButton() {
    if (parentRouteArgs.showAction) {
      return (
        <>
          {!bookmark ? (
            <Button
              style={{
                backgroundColor: "#ffd100",
                color: "#FFFFFF",
                fontSize: "18px",
                borderRadius: 16,
                marginTop: "5px",
                height: "45px",
                width: 360,
                fontWeight: "bold"
              }}
              onClick={e => {
                createBookmark(e);
              }}
            >
              Bookmark
            </Button>
          ) : (
            <Button
              style={{
                backgroundColor: "#ff3333",
                color: "#FFFFFF",
                fontSize: "18px",
                borderRadius: 16,
                marginTop: "5px",
                height: "45px",
                width: 360,
                fontWeight: "bold"
              }}
              onClick={e => {
                deleteBookmark(e);
              }}
            >
              Unbookmark
            </Button>
          )}

          <Button
            style={{
              backgroundColor: "#32cd32",
              color: "#FFFFFF",
              fontSize: "18px",
              borderRadius: 16,
              marginTop: "5px",
              marginBottom: "20px",
              height: "45px",
              width: 360,
              fontWeight: "bold"
            }}
            onClick={() => {
              setRouteArgs(parentRouteArgs.lesson);
              routeTo(route.createEventPage);
            }}
          >
            Request
          </Button>
        </>
      );
    } else {
      return <></>;
    }
  }
  return (
    <>
      <div style={ContainerStyles}>
        <LessonInfoPage lesson={parentRouteArgs.lesson} />
        {actionButton()}
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
