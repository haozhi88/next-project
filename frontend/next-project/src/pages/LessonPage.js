/* Import package components */
import React, { useState, useEffect } from "react";
import { Button } from "@material-ui/core";
import { route, getApiRoute } from "../global";
import axios from "axios";

/* Import app components */
import DialogPage from "../components/DialogPage";
import LessonInfoPage from "../pages/LessonInfoPage";
import LoadingNav from "../components/LoadingNav";

/* CSS Styles */
const ContainerStyles = {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  width: "100%",
  paddingTop: "5px"
};

export default function LessonPage({ parentRouteArgs }) {
  const [bookmark, setBookmark] = useState(false);
  const [event, setEvent] = useState(false);
  const [routeArgs, setRouteArgs] = useState([]);
  const [routeOption, setRouteOption] = useState(route.close);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const routeTo = option => {
    if (option === route.close) {
      setDialogOpen(false);
    } else {
      setDialogOpen(true);
    }
    setRouteOption(option);
  };

  useEffect(() => {
    const token = localStorage.getItem("userToken");
    const config = {
      headers: {
        Authorization: "Bearer " + token
      }
    };
    axios
      .get(`${getApiRoute("bookmarks/")}${parentRouteArgs.lesson.id}`, config)
      .then(result => {
        setBookmark(result.data.data);
        setIsLoading(false);
      })
      .catch(error => {
        console.log(error);
      });

    axios
      .get(`${getApiRoute("events/exists")}`, {
        ...config,
        params: {
          lesson_id: parentRouteArgs.lesson.id
        }
      })
      .then(result => {
        setEvent(result.data);
        setIsLoading(false);
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
      .then(setBookmark(false))
      .catch(error => {
        console.log(error);
      });
  };

  if (isLoading) {
    return <LoadingNav />;
  }
  function actionButton() {
    if (parentRouteArgs.showAction) {
      return (
        <>
          {!bookmark && !event ? (
            <>
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
              <Button
                style={{
                  backgroundColor: "#1589FF",
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
                  setRouteArgs({
                    lesson: parentRouteArgs.lesson,
                    setEvent: setEvent
                  });
                  routeTo(route.createEventPage);
                }}
              >
                Request
              </Button>
            </>
          ) : bookmark && !event ? (
            <>
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
              <Button
                style={{
                  backgroundColor: "#1589FF",
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
                  setRouteArgs({
                    lesson: parentRouteArgs.lesson,
                    setEvent: setEvent
                  });
                  routeTo(route.createEventPage);
                }}
              >
                Request
              </Button>
            </>
          ) : (
            <></>
          )}
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
